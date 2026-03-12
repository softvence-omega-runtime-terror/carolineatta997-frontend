"use client";

import { useGetEventQuery } from "@/redux/features/scout/eventsApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params.id;

  const { data: event, isLoading, error } = useGetEventQuery(Number(eventId));

  console.log(event);

  return (
    <div>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Link href={"/scout/events"} className="text-white">
            ← Back to Event Details
          </Link>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="bg-black p-2 rounded-xl  text-blue-400">
              {event?.event_type}
            </p>
            <p className="text-white text-sm font-semibold">
              {event?.is_featured ? "Featured Event" : "Not Featured Event"}
            </p>
          </div>
          <Image
            src={"/images/event-banner.jpg"}
            alt={"Event Banner"}
            width={1100}
            height={570}
            className=""
          />
        </div>
        <div className="bg-[#00000082] p-4 rounded-lg ">
          <h1 className="text-white">{event?.event_name}</h1>
          <div className="flex gap-5 ">
            <Image
              src={"/images/club-logo.png"}
              alt={"Event Banner"}
              width={70}
              height={50}
              className=""
            />
            <div className="flex-col flex mt-4">
              <span className="text-white text-xs">{event?.event_name}</span>
              <span className="text-white flex items-center gap-2">
                <CiLocationOn size={20} />
                {event?.city}
              </span>
            </div>
          </div>
        </div>




        <div className="">
          <div className="">
            <p className="text-white">Event Details</p>
            <div className="flex items-center gap-30">
              {/* left side  */}
              <div className="space-y-2">
                <p>Date</p>

                <p>Location</p>
                <p className="text-white">{event?.venue_name}</p>
                <p className="text-white">{event?.street_address}</p>
                <p className="text-white">Age Group</p>
                <p className="text-white">
                  U{event?.minimum_age}-U{event?.maximum_age}
                </p>
              </div>
              {/* Right side  */}
              <div className="space-y-2">
                <p className="text-white">Time</p>
                <p className="text-white">
                  {event?.start_time}-{event?.end_time}
                </p>
                <p className="text-white">Entry Fee</p>
                <p className="text-white">{event?.registration_fee}</p>
                <div>
                  <span className="text-[#2DD4BF] font-bold text-lg">
                    {event?.registered_count}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    / 100 Scouts Registered
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* about section */}
        <div className="text-white">
          <h1>About This Event</h1>
          <p>{event?.description}</p>
        </div>
        
          <div className="col-span-1 text-white space-y-5 mt-3">
            <div>
            <h1>Register as Scout</h1>
            <p>Register to observe players and access full event details</p>
               <Link
                  href={`/scout/eventRegister?eventId=${event?.id}`}
                  className="flex-1 bg-[#04B5A3] hover:bg-[#2DD4BF] text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-colors"
                >
                  Register Now
                </Link>
          </div>
          <div>
            <h1 className="text-white flex items-center gap-2">
              <GoOrganization size={30}/> Event Organizer
            </h1>
            <p>Contact Person</p>
            <p>contact email</p>
            <p>Contact number</p>
          </div>
          </div>
        </div>
        
{/* show register player  */}

<div>
  
</div>



      </div>
    </div>
  );
};

export default EventDetailsPage;
