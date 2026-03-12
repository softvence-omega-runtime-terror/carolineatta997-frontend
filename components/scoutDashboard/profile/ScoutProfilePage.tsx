import { useUpdateProfileMutation } from "@/redux/features/scout/scoutProfileApi";
import { ScoutProfile } from "@/types/scout/profileType";
import { useForm } from "react-hook-form";

function ProfileEditForm({
  profile,
  onCancel,
}: {
  profile: ScoutProfile;
  onCancel: () => void;
}) {
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();
  const { register, handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: { /* map from profile */ },
  });

  const onSubmit = async (data: FormValues) => {
    // your current submit logic
    await updateProfile(...);
    // on success:
    toast.success("Profile updated!");
    onCancel();           // ← go back to view mode
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Your current form content */}
      {/* ... all cards, inputs, FieldArray ... */}

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-[#1A2160] text-white rounded-lg hover:bg-[#2D3568]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !formState.isDirty}
          onClick={handleSubmit(onSubmit)}
          className="px-6 py-2.5 bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] rounded-lg font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}