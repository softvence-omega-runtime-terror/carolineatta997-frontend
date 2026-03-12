"use client";

import EventFilters from "@/components/scoutDashboard/event/EventFilterSelect";
import { useGetAllEventsQuery } from "@/redux/features/scout/eventsApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";

const Page = () => {
  // Filter states
  const [country, setCountry] = useState(""); // not used yet
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const filters = useMemo(() => {
    const params: any = { page };
    if (eventType) params.event_type = eventType;
    if (date) params.event_date = date;
    if (debouncedSearch) params.search = debouncedSearch;

    return params;
  }, [eventType, date, debouncedSearch, page]);

  const { data, isLoading, error } = useGetAllEventsQuery(filters);
  console.log("eventy data", data);

  const eventTypes = useMemo(() => {
    if (!data?.results) return [];
    const types = new Set(data.results.map((e) => e.event_type));
    return Array.from(types);
  }, [data]);

  const countries = [
    "Spain",
    "Portugal",
    "France",
    "Germany",
    "England",
    "Brazil",
    "Italy",
  ];

  const handleReset = () => {
    setCountry("");
    setEventType("");
    setDate("");
    setSearch("");
    setPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Date formatter
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
        Events
      </h1>

      {/* Filters */}
      <div className="mb-10">
        <EventFilters
          country={country}
          setCountry={setCountry}
          eventType={eventType}
          setEventType={setEventType}
          date={date}
          setDate={setDate}
          search={search}
          setSearch={setSearch}
          onReset={handleReset}
          countries={countries}
          eventTypes={eventTypes}
        />
      </div>

      {/* Card Grid */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data?.results.map((event) => (
          <div
            key={event.id}
            className="bg-[#12143A] rounded-xl border border-[#00E5FF]/20 overflow-hidden hover:border-[#00E5FF]/40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
          >
            {/* Top bar with tags */}
            {/* Event Image Banner */}
            <div className="relative h-44 w-full">
              <Image
                src="/images/event-card.jpg"
                alt="event card image"
                fill
                className="object-cover"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12143A] via-transparent to-transparent" />

              {/* Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-[#1DA1F2] text-white text-xs font-semibold px-3 py-1 rounded-md">
                  {event.event_type}
                </span>
              </div>

              {event.is_featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-[#2DD4BF] text-[#0f1238] text-xs font-semibold px-3 py-1 rounded-md">
                    Featured
                  </span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-white text-xl font-bold mb-3">
                {event.event_name}
              </h2>

              {/* Club & location */}
              <div className="flex items-start gap-3 mb-4">
                <Image
                  src={"/images/club-logo.png"}
                  alt="club logo"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="text-white font-medium">{event.venue_name}</p>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mt-0.5">
                    <SlLocationPin size={14} className="text-gray-500" />
                    {event.location || "Location TBD"}
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-700/50 my-4" />

              {/* Date & Time + Entry Fee */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">
                    Date & Time
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {formatDate(event.event_date)}
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {event.start_time ? event.start_time.substring(0, 5) : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">
                    Entry Fee
                  </p>
                  <p className="text-white text-xl font-bold">
                    {Number(event.registration_fee) === 0
                      ? "Free"
                      : `$${event.registration_fee}`}
                  </p>
                </div>
              </div>

              {/* Scouts registered + Location venue */}
              <div className="flex justify-between items-center mb-5">
                <div>
                  <span className="text-[#2DD4BF] font-bold text-lg">
                    {event.registered_count}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    / 100 Scouts Registered
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-white text-sm font-medium">
                    {event.venue_address || "Venue TBD"}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Link
                  href={`/scout/eventRegister?eventId=${event.id}`}
                  className="flex-1 bg-[#04B5A3] hover:bg-[#2DD4BF] text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-colors"
                >
                  Register Now
                </Link>
                <Link
                  href={`/scout/events/${event.id}`}
                  className="flex-1 border border-[#04B5A3] text-[#04B5A3] hover:bg-[#04B5A3]/10 text-sm font-semibold py-2.5 rounded-lg text-center transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More (if next page exists) */}
      {data?.next && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-8 py-2.5 rounded-lg border border-[#2DD4BF]/40 text-[#2DD4BF] text-sm font-semibold hover:bg-[#2DD4BF]/10 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
