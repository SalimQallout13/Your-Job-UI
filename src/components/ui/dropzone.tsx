import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import Progress from '@/components/ui/progress';
import { cn } from "@/lib/utils/utils";
import { Icons } from './icons';

interface DropzoneProps {
	accept: string;
	maxSize: number;
	onFileChange: (file: File | null) => void;
	children?: React.ReactNode;
}

const Dropzone: React.FC<DropzoneProps> = ({
																						 accept,
																						 maxSize,
																						 onFileChange
																					 }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadTimeRemaining, setUploadTimeRemaining] = useState(1);

	// Simulation de l'upload
	React.useEffect(() => {
		const UPLOAD_DURATION_MS = 1000; // 1 seconde
		const PROGRESS_INTERVAL_MS = 40; // 40ms entre chaque mise à jour
		const PROGRESS_INCREMENT = 4; // 4% par mise à jour

		let progressTimer: NodeJS.Timeout;
		let countdownTimer: NodeJS.Timeout;

		if (selectedFile) {
			setUploadProgress(0);
			setIsUploading(true);
			setUploadTimeRemaining(1);

			progressTimer = setInterval(() => {
				setUploadProgress(prev => {
					if (prev >= 100) {
						clearInterval(progressTimer);
						setIsUploading(false);
						return 100;
					}
					return prev + PROGRESS_INCREMENT;
				});
			}, PROGRESS_INTERVAL_MS);

			countdownTimer = setInterval(() => {
				setUploadTimeRemaining(prev => Math.max(0, prev - 1));
			}, UPLOAD_DURATION_MS);
		}

		return () => {
			clearInterval(progressTimer);
			clearInterval(countdownTimer);
		};
	}, [selectedFile]);

	const handleDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file && file.size <= maxSize) {
				setSelectedFile(file);
				onFileChange(file);
			}
		},
		[maxSize, onFileChange]
	);

	const handleDelete = () => {
		setSelectedFile(null);
		onFileChange(null);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleDrop,
		accept: accept ? { [accept]: [] } : undefined,
		maxSize,
		multiple: false
	});

	return (
		<div className="w-full">
			<div
				{...getRootProps()}
				className={cn(
					"cursor-pointer transition-colors",
					"rounded-xl border border-dashed focus:border-purple",
					isDragActive ? "border-purple bg-purple/5" : "border-gray-200",
					"w-full"
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center gap-4 p-6">
					<Upload className="size-6 text-gray-400" />
					<div className="text-center text-sm">
						<p>
							Glissez-déposez ou{" "}
							<span className="text-purple">choisissez un fichier</span>{" "}
							à télécharger
						</p>
					</div>
				</div>
			</div>

			{selectedFile && (
				<FileCard
					file={selectedFile}
					onDelete={handleDelete}
					uploadProgress={uploadProgress}
					uploadTimeRemaining={uploadTimeRemaining}
					isUploading={isUploading}
				/>
			)}
		</div>
	);
};

export default Dropzone;


interface FileCardProps {
	file: File;
	onDelete: () => void;
	uploadProgress: number;
	uploadTimeRemaining: number;
	isUploading: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
																						 file,
																						 onDelete,
																						 uploadProgress,
																						 uploadTimeRemaining,
																						 isUploading
																					 }) => {
	const fileSize = (file.size / 1024).toFixed(0);

	return (
		<div className="mt-4 rounded-lg bg-gray-100 p-4">
			<div className="relative flex items-start gap-3">
				<Icons.pdf className="mt-1 size-12 shrink-0 text-gray-400" />
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<p className="truncate font-medium text-gray-700">
							{file.name}
						</p>
						<button
							onClick={onDelete}
							className="mb-2 shrink-0 rounded-full p-1 hover:bg-gray-200"
							type="button"
						>
							<X className="size-4 text-gray-500" />
						</button>
					</div>
					<p className="mt-2 truncate text-xs text-gray-500">
						{fileSize} ko
						{isUploading && (
							<>
								<span className="mx-1">-</span>
								{uploadTimeRemaining} secondes restantes
							</>
						)}
					</p>
					{isUploading && (
						<Progress
							value={uploadProgress}
							className="mt-4 h-1 w-full bg-white [&>*]:bg-purple"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

