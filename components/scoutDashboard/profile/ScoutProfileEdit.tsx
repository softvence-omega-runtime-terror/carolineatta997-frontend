// components/scoutDashboard/profile/ProfileEditForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import {
  MapPin,
  Globe,
  Twitter,
  Facebook,
  Youtube,
  Plus,
  X,
  Save,
  Camera,
  Trophy,
} from "lucide-react";
import { useUpdateProfileMutation } from "@/redux/features/scout/scoutProfileApi";
import { ScoutProfile, Achievement } from "@/types/scout/profileType";

// Form types
interface FormValues {
  first_name: string;
  last_name: string;
  bio: string;
  about: string;
  location: string;
  experience_years: number | string;
  connections: number | string;
  website: string;
  twitter: string;
  facebook: string;
  youtube: string;
  profile_visibility: string;
  contact_requests: boolean;
  show_online_status: boolean;
  activity_history: boolean;
  preferred_leagues: string;
  contact_status: string;
  availability: string;
  specialization: string;
  achievements: {
    id?: number;
    club_name: string;
    achievement: string;
    year: number | string;
    affiliation_type: string;
  }[];
}

const Divider = () => <div className="h-px bg-[#1A2160] my-3" />;

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] text-[#5B6397] uppercase tracking-wider mb-1 block">
    {children}
  </label>
);

const inputCls =
  "w-full bg-[#111640] border border-[#1A2160] text-white text-xs rounded-lg px-3 py-2.5 placeholder-[#2D3568] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]/20 transition-all";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4 mb-3">
    {children}
  </div>
);

const SectionHead = ({
  title,
  badge,
  onAdd,
}: {
  title: string;
  badge?: number;
  onAdd?: () => void;
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397]">
        {title}
      </span>
      {badge !== undefined && (
        <span className="text-[9px] font-bold text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded px-1.5 py-0.5">
          {badge}
        </span>
      )}
    </div>
    {onAdd && (
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-[#00D9FF] text-[10px] hover:brightness-125 transition-all"
      >
        <Plus size={9} /> Add
      </button>
    )}
  </div>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-[#00D9FF]" : "bg-[#1A2160]"}`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`}
    />
  </button>
);

export default function ProfileEditForm({
  profile,
  onCancel,
  onSuccess,
}: {
  profile: ScoutProfile;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState(profile.cover_image ?? "");
  const [avatarPreview, setAvatarPreview] = useState(profile.profile_image ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      bio: profile.bio ?? "",
      about: profile.about ?? "",
      location: profile.location ?? "",
      experience_years: profile.experience_years ?? "",
      connections: profile.connections ?? "",
      website: profile.website ?? "",
      twitter: profile.twitter ?? "",
      facebook: profile.facebook ?? "",
      youtube: profile.youtube ?? "",
      profile_visibility: profile.profile_visibility ?? "public",
      contact_requests: profile.contact_requests ?? false,
      show_online_status: profile.show_online_status ?? false,
      activity_history: profile.activity_history ?? false,
      preferred_leagues: profile.preferred_leagues ?? "",
      contact_status: profile.contact_status ?? "",
      availability: profile.availability ?? "",
      specialization: profile.specialization?.join(", ") ?? "",
      achievements: (profile.achievements ?? []).map((a) => ({
        id: a.id,
        club_name: a.club_name ?? "",
        achievement: a.achievement ?? "",
        year: a.year ?? new Date().getFullYear(),
        affiliation_type: a.affiliation_type ?? "",
      })),
    },
  });

  useEffect(() => {
    reset({
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      bio: profile.bio ?? "",
      about: profile.about ?? "",
      location: profile.location ?? "",
      experience_years: profile.experience_years ?? "",
      connections: profile.connections ?? "",
      website: profile.website ?? "",
      twitter: profile.twitter ?? "",
      facebook: profile.facebook ?? "",
      youtube: profile.youtube ?? "",
      profile_visibility: profile.profile_visibility ?? "public",
      contact_requests: profile.contact_requests ?? false,
      show_online_status: profile.show_online_status ?? false,
      activity_history: profile.activity_history ?? false,
      preferred_leagues: profile.preferred_leagues ?? "",
      contact_status: profile.contact_status ?? "",
      availability: profile.availability ?? "",
      specialization: profile.specialization?.join(", ") ?? "",
      achievements: (profile.achievements ?? []).map((a) => ({
        id: a.id,
        club_name: a.club_name ?? "",
        achievement: a.achievement ?? "",
        year: a.year ?? new Date().getFullYear(),
        affiliation_type: a.affiliation_type ?? "",
      })),
    });
  }, [profile, reset]);

  const {
    fields: achFields,
    append: appendAch,
    remove: removeAch,
  } = useFieldArray({ control, name: "achievements" });

  const contactRequests = watch("contact_requests");
  const showOnline = watch("show_online_status");
  const activityHistory = watch("activity_history");

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let payload: FormData | Partial<ScoutProfile>;

      if (coverFile || avatarFile) {
        const fd = new FormData();
        if (coverFile) fd.append("cover_image", coverFile);
        if (avatarFile) fd.append("profile_image", avatarFile);

        const scalar: (keyof Omit<FormValues, "achievements">)[] = [
          "first_name",
          "last_name",
          "bio",
          "about",
          "location",
          "experience_years",
          "connections",
          "website",
          "twitter",
          "facebook",
          "youtube",
          "profile_visibility",
          "preferred_leagues",
          "contact_status",
          "availability",
          "specialization",
        ];
        scalar.forEach((k) => {
          const v = data[k];
          if (v !== undefined && v !== null && v !== "")
            fd.append(k, String(v));
        });
        fd.append("contact_requests", String(data.contact_requests));
        fd.append("show_online_status", String(data.show_online_status));
        fd.append("activity_history", String(data.activity_history));
        fd.append("achievements", JSON.stringify(data.achievements));
        payload = fd;
      } else {
        payload = {
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          about: data.about,
          location: data.location,
          experience_years: Number(data.experience_years),
          connections: Number(data.connections),
          website: data.website,
          twitter: data.twitter,
          facebook: data.facebook,
          youtube: data.youtube,
          profile_visibility: data.profile_visibility,
          contact_requests: data.contact_requests,
          show_online_status: data.show_online_status,
          activity_history: data.activity_history,
          preferred_leagues: data.preferred_leagues,
          contact_status: data.contact_status,
          availability: data.availability,
          specialization: data.specialization
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          achievements: data.achievements.map((a) => ({
            ...(a.id ? { id: a.id } : {}),
            club_name: a.club_name,
            achievement: a.achievement,
            year: Number(a.year),
            affiliation_type: a.affiliation_type,
          })) as Achievement[],
        };
      }

      await updateProfile({ id: profile.id, data: payload }).unwrap();
      toast.success("Profile updated successfully!");
      setCoverFile(null);
      setAvatarFile(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      {/* Hidden file inputs */}
      <input
        ref={coverRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverChange}
      />
      <input
        ref={avatarRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* Avatar and Cover Upload in Edit Mode */}
      <div className="mb-6">
        <div
          className="relative h-[120px] rounded-xl overflow-hidden cursor-pointer group mb-4"
          onClick={() => coverRef.current?.click()}
        >
          {coverPreview ? (
            <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0B2040] via-[#0A1530] to-[#070B24]" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-1 text-white text-xs">
              <Camera size={12} /> Change Cover
            </div>
          </div>
        </div>

        <div className="flex items-end gap-3 -mt-8">
          <div
            className="relative w-[60px] h-[60px] rounded-full border-[3px] border-[#08092F] bg-[#111640] overflow-hidden flex-shrink-0 cursor-pointer group"
            onClick={() => avatarRef.current?.click()}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#2D3568]">
                {/* Placeholder */}
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={13} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        <Card>
          <SectionHead title="Basic Information" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>First Name</FieldLabel>
              <input
                {...register("first_name")}
                className={inputCls}
                placeholder="First name"
              />
            </div>
            <div>
              <FieldLabel>Last Name</FieldLabel>
              <input
                {...register("last_name")}
                className={inputCls}
                placeholder="Last name"
              />
            </div>
            <div>
              <FieldLabel>Location</FieldLabel>
              <div className="relative">
                <MapPin
                  size={11}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3568]"
                />
                <input
                  {...register("location")}
                  className={`${inputCls} pl-8`}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div>
              <FieldLabel>Experience (years)</FieldLabel>
              <input
                {...register("experience_years")}
                type="number"
                className={inputCls}
                placeholder="0"
              />
            </div>
            <div>
              <FieldLabel>Availability</FieldLabel>
              <input
                {...register("availability")}
                className={inputCls}
                placeholder="e.g. Full-time"
              />
            </div>
            <div>
              <FieldLabel>Contact Status</FieldLabel>
              <input
                {...register("contact_status")}
                className={inputCls}
                placeholder="e.g. Available"
              />
            </div>
            <div className="col-span-2">
              <FieldLabel>Specialization (comma-separated)</FieldLabel>
              <input
                {...register("specialization")}
                className={inputCls}
                placeholder="e.g. youth_scouting, international_scouting"
              />
            </div>
          </div>
        </Card>

        {/* About */}
        <Card>
          <SectionHead title="About" />
          <div className="flex flex-col gap-3">
            <div>
              <FieldLabel>Short Bio</FieldLabel>
              <textarea
                {...register("bio")}
                rows={2}
                className={`${inputCls} resize-none`}
                placeholder="A short bio…"
              />
            </div>
            <div>
              <FieldLabel>Detailed About</FieldLabel>
              <textarea
                {...register("about")}
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Tell scouts more about your background…"
              />
            </div>
          </div>
        </Card>

        {/* Contact / Social */}
        <Card>
          <SectionHead title="Contact & Social" />
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Website",
                name: "website" as const,
                icon: <Globe size={11} />,
                ph: "https://…",
              },
              {
                label: "Twitter / X",
                name: "twitter" as const,
                icon: <Twitter size={11} />,
                ph: "@handle",
              },
              {
                label: "Facebook",
                name: "facebook" as const,
                icon: <Facebook size={11} />,
                ph: "Facebook URL",
              },
              {
                label: "YouTube",
                name: "youtube" as const,
                icon: <Youtube size={11} />,
                ph: "YouTube URL",
              },
            ].map((f) => (
              <div key={f.name}>
                <FieldLabel>{f.label}</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3568]">
                    {f.icon}
                  </span>
                  <input
                    {...register(f.name)}
                    className={`${inputCls} pl-8`}
                    placeholder={f.ph}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Scouting Options */}
        <Card>
          <SectionHead title="Scouting Options" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Preferred Leagues / Regions</FieldLabel>
              <input
                {...register("preferred_leagues")}
                className={inputCls}
                placeholder="Premier League, La Liga"
              />
            </div>
            <div>
              <FieldLabel>Profile Visibility</FieldLabel>
              <select
                {...register("profile_visibility")}
                className={`${inputCls} appearance-none`}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="connections_only">Connections Only</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <SectionHead title="Privacy Settings" />
          <div className="flex flex-col gap-3">
            {[
              {
                label: "Contact Requests",
                sub: "Allow others to contact you",
                checked: contactRequests,
                field: "contact_requests" as const,
              },
              {
                label: "Show Online Status",
                sub: "Display when you're active",
                checked: showOnline,
                field: "show_online_status" as const,
              },
              {
                label: "Activity History",
                sub: "Track your scouting activity",
                checked: activityHistory,
                field: "activity_history" as const,
              },
            ].map((item) => (
              <div
                key={item.field}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-[#8891BB] text-xs font-medium">
                    {item.label}
                  </p>
                  <p className="text-[#5B6397] text-[9px]">{item.sub}</p>
                </div>
                <Toggle
                  checked={!!item.checked}
                  onChange={() => setValue(item.field, !item.checked)}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Professional History */}
        <Card>
          <SectionHead
            title="Professional History"
            badge={achFields.length}
            onAdd={() =>
              appendAch({
                club_name: "",
                achievement: "",
                year: new Date().getFullYear(),
                affiliation_type: "",
              })
            }
          />
          {achFields.length === 0 ? (
            <div className="border border-dashed border-[#1A2160] rounded-lg py-7 flex flex-col items-center">
              <Trophy size={16} className="text-[#2D3568] mb-2" />
              <p className="text-[#2D3568] text-[9px]">
                No history added yet
              </p>
              <button
                type="button"
                onClick={() =>
                  appendAch({
                    club_name: "",
                    achievement: "",
                    year: new Date().getFullYear(),
                    affiliation_type: "",
                  })
                }
                className="mt-2 flex items-center gap-1 text-[#00D9FF] text-[10px]"
              >
                <Plus size={9} /> Add Entry
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {achFields.map((field, i) => (
                <div
                  key={field.id}
                  className="bg-[#111640] border border-[#1A2160] rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={10} className="text-[#00D9FF]" />
                      <span className="text-[#00D9FF] text-[10px] font-semibold">
                        Entry {i + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAch(i)}
                      className="text-[#2D3568] hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FieldLabel>Club / Organization</FieldLabel>
                      <input
                        {...register(`achievements.${i}.club_name`)}
                        className={inputCls}
                        placeholder="Club name"
                      />
                    </div>
                    <div>
                      <FieldLabel>Year</FieldLabel>
                      <input
                        {...register(`achievements.${i}.year`)}
                        type="number"
                        className={inputCls}
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <FieldLabel>Achievement</FieldLabel>
                      <input
                        {...register(`achievements.${i}.achievement`)}
                        className={inputCls}
                        placeholder="e.g. Top Scout Award"
                      />
                    </div>
                    <div>
                      <FieldLabel>Affiliation Type</FieldLabel>
                      <input
                        {...register(`achievements.${i}.affiliation_type`)}
                        className={inputCls}
                        placeholder="e.g. Club, Federation"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Save/Cancel */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-[#1A2160] text-[#8891BB] rounded-lg text-sm hover:bg-[#2D3568] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving…" : <> <Save size={14} /> Save Changes </>}
          </button>
        </div>
      </form>
    </div>
  );
}