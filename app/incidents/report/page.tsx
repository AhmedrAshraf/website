"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import supabase from "../../../utils/supabase";

const LocationPicker = dynamic(() => import("../../components/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const INCIDENT_TYPES = [
  'ICE Activity',
  'Border Patrol Activity',
  'Checkpoint',
  'Raid in Progress',
  'Suspicious Vehicle',
  'Other Activity'
];

const INCIDENT_DESCRIPTIONS = {
  'ICE Activity': [
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Badge numbers (if visible)', type: 'text' },
    { label: 'Actions being taken', type: 'text' },
    { label: 'Witnesses present', type: 'text' }
  ],
  'Border Patrol Activity': [
    { label: 'Number of agents', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Actions being taken', type: 'text' },
    { label: 'Checkpoint or mobile unit', type: 'text' }
  ],
  'Checkpoint': [
    { label: 'Checkpoint location', type: 'text' },
    { label: 'Type of checkpoint', type: 'text' },
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Specific activities observed', type: 'text' }
  ],
  'Raid in Progress': [
    { label: 'Location of raid', type: 'text' },
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Type of location (business/residence)', type: 'text' },
    { label: 'Actions being taken', type: 'text' }
  ],
  'Suspicious Vehicle': [
    { label: 'Vehicle description', type: 'text' },
    { label: 'License plate (if visible)', type: 'text' },
    { label: 'Number of occupants', type: 'text' },
    { label: 'Observed behavior', type: 'text' },
    { label: 'Direction of travel', type: 'text' }
  ],
  'Other Activity': [
    { label: 'Please describe the activity in detail', type: 'text' },
    { label: 'Location', type: 'text' },
    { label: 'Personnel involved', type: 'text' },
    { label: 'Vehicles present', type: 'text' },
    { label: 'Actions observed', type: 'text' }
  ]
} as const;

export default function ReportIncidentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    description: {} as Record<string, string>,
    location: {
      lat: 0,
      lng: 0,
      address: ""
    },
    status: "active",
    attachment: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep !== 3) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const lat = parseFloat(formData.location.lat.toString()) || 0;
      const lng = parseFloat(formData.location.lng.toString()) || 0;

      if (isNaN(lat) || isNaN(lng)) {
        alert("Invalid coordinates. Please select a valid location.");
        return;
      }

      const formattedDescription = Object.entries(formData.description)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      const dataToInsert = {
        type: formData.type,
        description: formattedDescription,
        latitude: lat,
        longitude: lng,
        location_json: {
          lat: lat,
          lng: lng,
          address: formData.location.address || "No address provided"
        },
        location_text: `POINT(${lng} ${lat})`,
        address: formData.location.address || "No address provided",
        created_at: new Date().toISOString(),
        status: 'active'
      };

      let insertResult = await supabase
        .from("incidents")
        .insert([dataToInsert])
        .select();

      if (insertResult.error) {
        console.error("Error inserting data:", insertResult.error);
        
        const simplifiedData = {
          type: formData.type,
          description: formattedDescription,
          latitude: lat,
          longitude: lng,
          address: formData.location.address || "No address provided",
          created_at: new Date().toISOString(),
          status: 'active'
        };

        insertResult = await supabase
          .from("incidents")
          .insert([simplifiedData])
          .select();

        if (insertResult.error) {
          console.error("Fallback error:", insertResult.error);
          alert("Failed to submit report. Please try again.");
          return;
        }
      }

      if (formData.attachment && insertResult.data?.[0]?.id) {
        const fileExt = formData.attachment.name.split('.').pop();
        const fileName = `${insertResult.data[0].id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('incident-attachments')
          .upload(fileName, formData.attachment);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
        }
      }

      setFormData({
        type: "",
        description: {},
        location: {
          lat: 0,
          lng: 0,
          address: ""
        },
        status: "active",
        attachment: null
      });

      alert("Report submitted successfully!");
      window.location.href = "/incidents";
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailChange = (label: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        [label]: value
      }
    }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        attachment: e.target.files![0]
      }));
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.type) {
      alert("Please select an incident type");
      return;
    }
    if (currentStep === 2 && Object.keys(formData.description).length === 0) {
      alert("Please fill in the incident details");
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/incidents"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Incidents
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Report an Incident
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Help keep our community informed and safe by reporting incidents in your area.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-blue-600 dark:bg-blue-500 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentStep >= step ? 1 : 0.8,
                  backgroundColor: currentStep >= step ? "rgb(37, 99, 235)" : "rgb(229, 231, 235)"
                }}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold transition-colors`}
              >
                {step}
              </motion.div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Incident Type */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      What type of incident would you like to report?
                    </label>
                    <div className="grid gap-4 md:grid-cols-2">
                      {INCIDENT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, type }))}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            formData.type === type
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {type}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Incident Details */}
              {currentStep === 2 && formData.type && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Please provide details about the {formData.type.toLowerCase()}
                    </h3>
                    <div className="space-y-4">
                      {INCIDENT_DESCRIPTIONS[formData.type as keyof typeof INCIDENT_DESCRIPTIONS].map(({ label }) => (
                        <div key={label}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {label}
                          </label>
                          <input
                            type="text"
                            value={formData.description[label] || ""}
                            onChange={(e) => handleDetailChange(label, e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location and Media */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Where did this incident occur?
                    </label>
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Add supporting media (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleVideoChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.location.lat || !formData.location.lng}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 