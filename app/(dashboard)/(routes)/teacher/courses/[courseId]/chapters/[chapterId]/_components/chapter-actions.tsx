"use client";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {Loader2, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useReward } from "react-rewards";
interface iProps {
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  disabled: boolean;
}

const ChapterActions = ({
  isPublished,
  disabled,
  courseId,
  chapterId,
}: iProps) => {
  const router = useRouter();
  const { reward, isAnimating  } = useReward('rewardId', 'confetti',{elementCount:500,lifetime:600,zIndex:9999,elementSize:12,});

  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      if (!isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/published`
        );
        reward();
        toast.success("Chapter published");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublished`
        );
        toast.success("Chapter unpublished");
      }

      router.refresh();
    } catch {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.back();
    } catch {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-medium flex items-center gap-x-2">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled || loading || isAnimating}
      >
        <span id="rewardId" />
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Dialog>
        <DialogTrigger>
          <TrashIcon className="w-9 h-9 cursor-pointer p-1 rounded-md text-white bg-black hover:opacity-75" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={onDelete}>
              {loading && <Loader2 className="animate-spin mr-2" />  }
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ChapterActions;
