import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { getImageUrl } from "../../../apis/onboarding.apis";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const maxSizeMB = 2;

interface Props {
  title: string;
  onUpload: (url: string) => void;
  style?: React.CSSProperties;
  displayImage?: boolean;
}
export default function ImageUpload({
  onUpload,
  style,
  title,
  displayImage = true,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from input
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes

      if (file.size > maxSizeBytes) {
        alert(
          `File size exceeds ${maxSizeMB}MB. Please upload a smaller file.`
        );
        return;
      }
      displayImage && setImage(file); // Send the file to onChange callback
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File | null) => {
    if (!file) {
      console.error("No file to upload");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await getImageUrl(formData);

      if (res) {
        console.log("File uploaded successfully:", res);
        onUpload(res.imageUrl ?? "");
      } else {
        console.error("File upload failed:");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      component="label"
      variant="outlined"
      tabIndex={-1}
      startIcon={
        loading ? (
          <CircularProgress size={24} />
        ) : image ? (
          <img
            src={URL.createObjectURL(image)}
            style={{ height: 40, width: 40 }}
          />
        ) : (
          <CloudUploadIcon />
        )
      }
      style={{ flex: 1, height: "50px", justifyContent: "start", ...style }}
    >
      {title}
      <VisuallyHiddenInput
        accept="image/png, image/jpeg"
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
}
