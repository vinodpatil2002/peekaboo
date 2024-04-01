'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import HomeCard from "./HomeCard"; // Assuming HomeCard is a reusable component for meeting types
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from './ui/use-toast';


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        | "isScheduleMeeting"
        | "isJoiningMeeting"
        | "isInstantMeeting"
        | undefined
    >(undefined);
    const [values, setValues] = useState({
        datetime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const { toast } = useToast();

    // Handle potential errors during initialization
    useEffect(() => {
        if (!client) {
            console.error("Stream Video client not available");
        }
    }, [client]);

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.datetime) {
                toast({ title: "Please select a date and time" });
                return;
            }

            const id = crypto.randomUUID(); // Assuming crypto is imported
            const call = client.call("default", id);
            if (!call) throw new Error("Call not found");

            const startsAt =
                values.datetime.toISOString() || new Date().toISOString();
            const description = values.description || "No description";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            } 
            toast({ title: "Meeting created successfully" });
        } catch (error) {
            console.error(error);
            toast({ title: "Failed to create a meeting" });
        }
    };

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Meeting Card for Starting an Instant Meeting */}
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState("isInstantMeeting")}
                className="bg-orange-1"
            />

            {/* Meeting Card for Scheduling a Meeting */}
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                handleClick={() => setMeetingState("isScheduleMeeting")}
                className="bg-blue-1"
            />

            {/* Placeholder for Other Meeting Type Cards (replace with actual components) */}
            <HomeCard
                img="/icons/recordings.svg" // Replace with appropriate icon
                title="View Recordings" // Replace with appropriate title
                description="Check your recordings" // Replace with appropriate description
                handleClick={() => {
                    /* Implement desired functionality */
                }}
                className="bg-purple-1"
            />

            <HomeCard
                img="/icons/join-meeting.svg" // Replace with appropriate icon
                title="Join Meeting" // Replace with appropriate title
                description="Join a meeting via link" // Replace with appropriate description
                handleClick={() => setMeetingState("isJoiningMeeting")}
                className="bg-yellow-1"
            />

            {/* Meeting Modal Component */}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;