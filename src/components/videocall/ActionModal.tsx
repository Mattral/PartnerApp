import { Button } from "components/ui/button";
import { useToast } from "../ui/use-toast";
import { LinkIcon, Wand } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";

const ActionModal = () => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" title="Action menu" className="flex items-center space-x-2">
          <Wand className="w-5 h-5" />
          <span>Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md">
        <DropdownMenuLabel className="text-sm font-medium text-gray-700 p-2">Customize As You See Fit</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="outline"
            className="w-full flex items-center space-x-2 py-2 px-4"
            onClick={async () => {
              const link = `${window.location.toString()}`;
              await navigator.clipboard.writeText(link);
              toast({ title: "Copied link to clipboard", description: link });
            }}
          >
            <LinkIcon className="w-5 h-5" />
            <span>Invite Others</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionModal;
