import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Trash2 } from "lucide-react"

interface FileUploaderProps {
	accept: string;
	maxSize: number;
	onFileSelect: (file: File | null) => void;
	children: React.ReactNode;
	widthFull?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
																										 accept,
																										 maxSize,
																										 onFileSelect,
																										 widthFull,
																										 children,
																									 }) => {
	const [preview, setPreview] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file && file.size <= maxSize) {
				onFileSelect(file);
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[maxSize, onFileSelect]
	);

	const handleRemove = () => {
		setPreview(null);
		onFileSelect(null); // Ajouter cette ligne pour mettre à jour le champ du formulaire
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: accept ? { [accept]: [] } : undefined,
		maxSize,
		multiple: false,
	});

	return (
		<div className="flex items-center gap-4">
			<div
				{...getRootProps()}
				className={cn(
					"cursor-pointer transition-colors rounded-full",
					isDragActive && "bg-purple/5",
					widthFull && "w-full"
				)}
			>
				<input {...getInputProps()} />
				{preview ? (
					<div className="size-14 overflow-hidden rounded-full">
						<img src={preview} alt="Preview" className="size-full object-cover" />
					</div>
				) : (
					children
				)}
			</div>
			{preview && (
				<Button
					type="button"
					variant="outline"
					className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
					onClick={handleRemove}  // Utiliser la nouvelle fonction handleRemove
				>
					<Trash2 className="size-4" /> Supprimer
				</Button>
			)}
		</div>
	);
};
