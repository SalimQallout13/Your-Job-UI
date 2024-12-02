import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Trash2 } from "lucide-react"

interface ImageUploaderProps {
	accept: string;
	maxSizeInBytes: number;
	onImageChange: (file: File | null) => void;
	uploadButton: React.ReactNode;
	isFullWidth?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
																															accept,
																															maxSizeInBytes,
																															onImageChange,
																															uploadButton,
																															isFullWidth = false,
																														}) => {
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	const handleFileDrop = useCallback(
		(acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];
			if (selectedFile && selectedFile.size <= maxSizeInBytes) {
				onImageChange(selectedFile);

				const fileReader = new FileReader();
				fileReader.onloadend = () => {
					setImagePreviewUrl(fileReader.result as string);
				};
				fileReader.readAsDataURL(selectedFile);
			}
		},
		[maxSizeInBytes, onImageChange]
	);

	const handleImageDelete = () => {
		setImagePreviewUrl(null);
		onImageChange(null);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleFileDrop,
		accept: accept ? { [accept]: [] } : undefined,
		maxSize: maxSizeInBytes,
		multiple: false,
	});

	return (
		<div className="flex items-center gap-4">
			<div
				{...getRootProps()}
				className={cn(
					"cursor-pointer transition-colors rounded-full",
					isDragActive && "bg-purple/5",
					isFullWidth && "w-full"
				)}
			>
				<input {...getInputProps()} />
				{imagePreviewUrl ? (
					<PreviewImage
						src={imagePreviewUrl}
						onDelete={handleImageDelete}
					/>
				) : (
					uploadButton
				)}
			</div>
		</div>
	);
};

interface PreviewImageProps {
	src: string;
	onDelete: () => void;
}

const PreviewImage = ({ src, onDelete }: PreviewImageProps) => (
	<div className="flex items-center gap-4">
		<div className="size-14 overflow-hidden rounded-full">
			<img src={src} alt="Aperçu" className="size-full object-cover" />
		</div>
		<Button
			type="button"
			variant="outline"
			className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
			onClick={onDelete}
		>
			<Trash2 className="size-4" />
			Supprimer
		</Button>
	</div>
);