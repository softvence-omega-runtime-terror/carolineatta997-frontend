"use client";

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  label: string;
  onChange: (signature: string | null) => void;
  error?: string;
}

const SignatureField = ({ label, onChange, error }: Props) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    onChange(null);
  };

  const handleEnd = () => {
    if (sigCanvas.current) {
      if (sigCanvas.current.isEmpty()) {
        onChange(null);
      } else {
        const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
        onChange(signatureData);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <label className="text-gray-300 font-medium">
          {label} <span className="text-red-500 font-bold">*</span>
        </label>
        <button
          type="button"
          onClick={clear}
          className="text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold"
        >
          Clear Signature
        </button>
      </div>

      <div
        className={`relative h-48 w-full bg-[#050B14]/60 border rounded-xl overflow-hidden transition-all duration-300 ${
          error ? "border-red-500/50 bg-red-500/5" : "border-white/5"
        }`}
      >
        <SignatureCanvas
          ref={sigCanvas}
          onEnd={handleEnd}
          penColor="white"
          canvasProps={{
            className: "w-full h-full cursor-crosshair",
          }}
        />
        
        {(!sigCanvas.current || sigCanvas.current.isEmpty()) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-500 text-xs">
             <svg className="w-5 h-5 mb-1 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
             </svg>
            <span>Sign with mouse or touch above</span>
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SignatureField;
