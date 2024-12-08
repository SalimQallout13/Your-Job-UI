import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Trash2 } from "lucide-react"
import { cva, VariantProps } from "class-variance-authority"


// Définir les variantes pour les tailles
const previewSizeVariants = cva("overflow-hidden rounded-full", {
	variants: {
		size: {
			sm: "size-8",  // 32px
			md: "size-14", // 56px
			lg: "size-20", // 80px
			xl: "size-48" // 200px
		}
	},
	defaultVariants: {
		size: "md" // Taille par défaut
	}
})

export type PreviewSizeProps = VariantProps<typeof previewSizeVariants>;

interface ImageUploaderProps extends PreviewSizeProps {
	accept: string;
	maxSizeInBytes: number;
	value?: File | null; // Ajout de `value`
	onImageChange: (file: File | null) => void;
	uploadButton: React.ReactNode;
	isFullWidth?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
																															accept,
																															maxSizeInBytes,
																															value,
																															onImageChange,
																															uploadButton,
																															isFullWidth = false,
																															size = "md"
																														}) => {
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

	// Synchroniser `value` (fichier ou URL) avec l'état interne
	useEffect(() => {
		if (typeof value === "string") {
			// Si c'est une URL, utilisez-la directement
			setImagePreviewUrl(value)
		} else if (value instanceof File) {
			// Si c'est un fichier, lisez-le pour générer une URL d'aperçu
			const fileReader = new FileReader()
			fileReader.onloadend = () => {
				setImagePreviewUrl(fileReader.result as string)
			}
			fileReader.readAsDataURL(value)
		} else {
			setImagePreviewUrl(null) // Si `value` est null, réinitialisez
		}
	}, [value])

	const handleFileDrop = useCallback(
		(acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0]
			if (selectedFile && selectedFile.size <= maxSizeInBytes) {
				onImageChange(selectedFile)

				const fileReader = new FileReader()
				fileReader.onloadend = () => {
					setImagePreviewUrl(fileReader.result as string)
				}
				fileReader.readAsDataURL(selectedFile)
			}
		},
		[maxSizeInBytes, onImageChange]
	)

	const handleImageDelete = () => {
		setImagePreviewUrl(null)
		onImageChange(null)
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleFileDrop,
		accept: accept ? { [accept]: [] } : undefined,
		maxSize: maxSizeInBytes,
		multiple: false
	})

	return (
		<div className="flex items-center gap-4">
			{imagePreviewUrl ? (
				<PreviewImage size={size} src={imagePreviewUrl} onDelete={handleImageDelete} getRootProps={getRootProps}
											getInputProps={getInputProps} isDragActive={isDragActive} isFullWidth={isFullWidth} />
			) : (
				<div
					{...getRootProps()}
					className={cn(
						"cursor-pointer transition-colors rounded-full",
						isDragActive && "bg-purple/5",
						isFullWidth && "w-full"
					)}
				>
					<input {...getInputProps()} />
					{uploadButton}
				</div>
			)}
		</div>
	)
}

interface PreviewImageProps extends PreviewSizeProps {
	src: string;
	onDelete: () => void;
	getRootProps: () => Record<string, unknown>; // Ajouter getRootProps
	getInputProps: () => Record<string, unknown>; // Ajouter getInputProps
	isDragActive: boolean;
	isFullWidth?: boolean;
}

const PreviewImage = ({
												src,
												onDelete,
												size,
												getRootProps,
												getInputProps,
												isDragActive,
												isFullWidth = false
											}: PreviewImageProps) => (
	<>
		<div
			{...getRootProps()}
			className={cn(
				"cursor-pointer transition-colors rounded-full",
				isDragActive && "bg-purple/5",
				isFullWidth && "w-full"
			)}
		>
			<input {...getInputProps()} />
			<div className={previewSizeVariants({ size })}>
				<img src={src} alt="Aperçu" className="size-full object-cover" />
			</div>
		</div>
		<Button
			type="button"
			variant="outline"
			className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
			onClick={onDelete}>
			<Trash2 className="size-4" />
			Supprimer
		</Button>
	</>
)
