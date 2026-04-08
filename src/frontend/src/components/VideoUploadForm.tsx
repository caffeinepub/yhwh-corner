import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Link, Tag, Upload, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUploadVideo } from "../hooks/useQueries";

const CATEGORIES = [
  "Technology",
  "Design",
  "Music",
  "Gaming",
  "Education",
  "Comedy",
  "Film",
  "Science",
  "Sports",
  "Business",
  "Travel",
  "Lifestyle",
  "Other",
];

interface FormErrors {
  title?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface VideoUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function VideoUploadForm({ onSuccess, onCancel }: VideoUploadFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const upload = useUploadVideo();

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required.";
    else if (title.trim().length < 3)
      errs.title = "Title must be at least 3 characters.";
    if (videoUrl && !isValidUrl(videoUrl)) errs.videoUrl = "Enter a valid URL.";
    if (thumbnailUrl && !isValidUrl(thumbnailUrl))
      errs.thumbnailUrl = "Enter a valid URL.";
    return errs;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { title: true, videoUrl: true, thumbnailUrl: true };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await upload.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
        videoUrl: videoUrl.trim(),
        category: category || "Other",
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast.success("Video uploaded!", {
        description: "Your video is saved as a draft. Publish it when ready.",
      });
      onSuccess();
    } catch {
      toast.error("Upload failed", {
        description: "Please check your inputs and try again.",
      });
    }
  };

  const fieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-ocid="upload-form">
      {/* Title */}
      <div className="space-y-1.5">
        <Label
          htmlFor="vf-title"
          className="font-display font-semibold text-sm"
        >
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="vf-title"
          placeholder="Give your video a compelling title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (touched.title) setErrors(validate());
          }}
          onBlur={() => handleBlur("title")}
          className={
            fieldError("title")
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
          data-ocid="upload-title"
          maxLength={120}
        />
        {fieldError("title") && (
          <p className="text-xs text-destructive">{fieldError("title")}</p>
        )}
        <p className="text-xs text-muted-foreground text-right">
          {title.length}/120
        </p>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="vf-desc" className="font-display font-semibold text-sm">
          Description
        </Label>
        <Textarea
          id="vf-desc"
          placeholder="Tell viewers what your video is about — good descriptions improve discoverability"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="resize-none"
          data-ocid="upload-description"
          maxLength={2000}
        />
        <p className="text-xs text-muted-foreground text-right">
          {description.length}/2000
        </p>
      </div>

      {/* Video URL */}
      <div className="space-y-1.5">
        <Label
          htmlFor="vf-url"
          className="font-display font-semibold text-sm flex items-center gap-1.5"
        >
          <Video size={13} /> Video URL
        </Label>
        <Input
          id="vf-url"
          placeholder="https://example.com/your-video.mp4"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
            if (touched.videoUrl) setErrors(validate());
          }}
          onBlur={() => handleBlur("videoUrl")}
          className={
            fieldError("videoUrl")
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
          data-ocid="upload-video-url"
        />
        {fieldError("videoUrl") && (
          <p className="text-xs text-destructive">{fieldError("videoUrl")}</p>
        )}
      </div>

      {/* Thumbnail URL */}
      <div className="space-y-1.5">
        <Label
          htmlFor="vf-thumb"
          className="font-display font-semibold text-sm flex items-center gap-1.5"
        >
          <ImageIcon size={13} /> Thumbnail URL
        </Label>
        <Input
          id="vf-thumb"
          placeholder="https://example.com/thumbnail.jpg"
          value={thumbnailUrl}
          onChange={(e) => {
            setThumbnailUrl(e.target.value);
            if (touched.thumbnailUrl) setErrors(validate());
          }}
          onBlur={() => handleBlur("thumbnailUrl")}
          className={
            fieldError("thumbnailUrl")
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
          data-ocid="upload-thumbnail-url"
        />
        {fieldError("thumbnailUrl") && (
          <p className="text-xs text-destructive">
            {fieldError("thumbnailUrl")}
          </p>
        )}
        {thumbnailUrl && isValidUrl(thumbnailUrl) && (
          <div className="mt-1.5 w-24 h-14 rounded-lg overflow-hidden border border-border">
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Category + Tags */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="vf-category"
            className="font-display font-semibold text-sm flex items-center gap-1.5"
          >
            <Link size={13} /> Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="vf-category" data-ocid="upload-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="vf-tags"
            className="font-display font-semibold text-sm flex items-center gap-1.5"
          >
            <Tag size={13} /> Tags
          </Label>
          <Input
            id="vf-tags"
            placeholder="design, motion, 3d"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            data-ocid="upload-tags"
          />
          <p className="text-xs text-muted-foreground">Comma-separated</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          data-ocid="upload-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={upload.isPending}
          className="flex-1 gradient-magenta-cyan text-white border-0 font-display font-semibold"
          data-ocid="upload-submit"
        >
          {upload.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Uploading…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload size={14} /> Upload Video
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
