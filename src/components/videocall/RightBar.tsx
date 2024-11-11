import Transcipt, { type TranscriptEleType } from "components/videocall/Transcript";
import { useSession } from "next-auth/react";
import { type RouterOutputs } from "utils/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

import Chat, { type ChatRecord } from "../chat/Chat";
import { useState, type MutableRefObject } from "react";
import { type VideoClient } from "@zoom/videosdk";
import { Button } from "../ui/button";


const RightBar = (props: RightBarProps) => {
  const { transcriptionSubtitle, data, inCall, client, records } = props;
  const { data: userData } = useSession();
  const [activeTab, setActiveTab] = useState("");

  // Ensure that userData and userData.user are defined before accessing role
  const userRole = userData?.user?.role;

  return userRole === "doctor" ? (
    <Tabs className="mt-2 flex flex-1 flex-col self-start" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="patient">Patient Data</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        {Object.keys(transcriptionSubtitle).length > 0 ? <TabsTrigger value="transcript">Transcript</TabsTrigger> : <></>}
        {inCall ? <TabsTrigger value="chat">Chat</TabsTrigger> : <></>}
        <Button
          variant={"secondary"}
          onClick={() => setActiveTab("")}
          style={activeTab !== "" ? { opacity: 1 } : { opacity: 0.6 }}
          className="font-mono text-lg"
        >
          x
        </Button>
      </TabsList>
      <div className="absolute right-0 z-10 mr-16 mt-12 flex rounded-md bg-white">
        <TabsContent value="transcript" className="p-4">
          <Transcipt transcriptionSubtitle={transcriptionSubtitle} />
        </TabsContent>
        <TabsContent value="chat" className="p-4">
          <Chat client={client} records={records} />
        </TabsContent>
      </div>
    </Tabs>
  ) : inCall ? (
    <Tabs className="mt-2 flex flex-1 flex-col self-start" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {Object.keys(transcriptionSubtitle).length > 0 ? <TabsTrigger value="transcript">Transcript</TabsTrigger> : <></>}
        {inCall ? <TabsTrigger value="chat">Chat</TabsTrigger> : <></>}
        <Button
          variant={"secondary"}
          onClick={() => setActiveTab("")}
          style={activeTab !== "" ? { opacity: 1 } : { opacity: 0.6 }}
          className="font-mono text-lg"
        >
          x
        </Button>
      </TabsList>
      <div className="absolute right-0 z-10 mr-16 mt-12 flex rounded-md bg-white">
        <TabsContent value="transcript" className="p-4">
          <Transcipt transcriptionSubtitle={transcriptionSubtitle} />
        </TabsContent>
        <TabsContent value="chat" className="p-4">
          <Chat client={client} records={records} />
        </TabsContent>
      </div>
    </Tabs>
  ) : (
    <></>
  );
};

type RightBarProps = {
  transcriptionSubtitle: TranscriptEleType;
  data: {
    id: string;
    title: string;
    content: string;
    userCreatedBy: string;
    userCreatedFor: string[];
    time: Date;
    duration: number;
    zoomSessionsIds: never[];
  };
  client: MutableRefObject<typeof VideoClient>;
  records: ChatRecord[];
  inCall: boolean;
};


export default RightBar;
