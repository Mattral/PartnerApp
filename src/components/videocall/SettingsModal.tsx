import { type MutableRefObject, useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Label } from "components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import ZoomVideo from "@zoom/videosdk";
import type { VideoClient } from "@zoom/videosdk";
import { Settings } from "lucide-react";

const SettingsModal = (props: { client: MutableRefObject<typeof VideoClient> }) => {
  const [cameraList, setCameraList] = useState<device[]>();
  const [micList, setMicList] = useState<device[]>();
  const [speakerList, setSpeakerList] = useState<device[]>();

  const getDevices = async () => {
    const allDevices = await ZoomVideo.getDevices();

    const cameraDevices = allDevices.filter((el) => el.kind === "videoinput");
    const micDevices = allDevices.filter((el) => el.kind === "audioinput");
    const speakerDevices = allDevices.filter((el) => el.kind === "audiooutput");

    return {
      cameras: cameraDevices.map((el) => ({ label: el.label, deviceId: el.deviceId })),
      mics: micDevices.map((el) => ({ label: el.label, deviceId: el.deviceId })),
      speakers: speakerDevices.map((el) => ({ label: el.label, deviceId: el.deviceId })),
    };
  };

  useEffect(() => {
    void getDevices().then((devices) => {
      setCameraList(devices.cameras);
      setMicList(devices.mics);
      setSpeakerList(devices.speakers);
    });
  }, []);

  const setCameraDevice = async (camera: device) => {
    const mediaStream = props.client.current.getMediaStream();
    if (mediaStream) {
      await mediaStream.switchCamera(camera.deviceId);
    }
  };

  const setMicDevice = async (mic: device) => {
    const mediaStream = props.client.current.getMediaStream();
    if (mediaStream) {
      await mediaStream.switchMicrophone(mic.deviceId);
    }
  };

  const setSpeakerDevice = async (speaker: device) => {
    const mediaStream = props.client.current.getMediaStream();
    if (mediaStream) {
      await mediaStream.switchSpeaker(speaker.deviceId);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Settings">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[450px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">Select Your Preferred Device</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="t1" className="mt-4">
          <TabsList className="flex border-b border-gray-300">
            <TabsTrigger value="t1" className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100">
              Cameras
            </TabsTrigger>
            <TabsTrigger value="t2" className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100">
              Microphones
            </TabsTrigger>
            <TabsTrigger value="t3" className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100">
              Speakers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="t1" className="mt-4">
            <RadioGroup className="flex space-x-4 overflow-x-auto max-w-full">
              {cameraList?.map((device) => (
                <div className="flex items-center space-x-2" key={device.deviceId}>
                  <RadioGroupItem
                    value={device.label}
                    id={device.deviceId}
                    onClick={() => setCameraDevice(device)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <Label htmlFor={device.deviceId} className="text-lg text-gray-800">{device.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="t2" className="mt-4">
            <RadioGroup className="flex space-x-4 overflow-x-auto max-w-full">
              {micList?.map((device) => (
                <div className="flex items-center space-x-2" key={device.deviceId}>
                  <RadioGroupItem
                    value={device.label}
                    id={device.deviceId}
                    onClick={() => setMicDevice(device)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <Label htmlFor={device.deviceId} className="text-lg text-gray-800">{device.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="t3" className="mt-4">
            <RadioGroup className="flex space-x-4 overflow-x-auto max-w-full">
              {speakerList?.map((device) => (
                <div className="flex items-center space-x-2" key={device.deviceId}>
                  <RadioGroupItem
                    value={device.label}
                    id={device.deviceId}
                    onClick={() => setSpeakerDevice(device)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <Label htmlFor={device.deviceId} className="text-lg text-gray-800">{device.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        </Tabs>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="button" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type device = {
  label: string;
  deviceId: string;
};

export default SettingsModal;