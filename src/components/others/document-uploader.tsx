import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils/utils";
import { Icons } from './icons';

interface DocumentUploaderProps {
	accept: string;
	maxSize: number;
	onFileSelect: (file: File | null) => void;
	children?: React.ReactNode;
}

interface FilePreviewProps {
	file: File;
	onRemove: () => void;
	progress: number;
	timeLeft: number;
	loading: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({
																									 file,
																									 onRemove,
																									 progress,
																									 timeLeft,
																									 loading
																								 }) => {
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
							onClick={onRemove}
							className="mb-2 shrink-0 rounded-full p-1 hover:bg-gray-200"
							type="button"
						>
							<X className="size-4 text-gray-500" />
						</button>
					</div>
					<p className="mt-2 truncate text-xs text-gray-500">
						{(file.size / 1024).toFixed(0)} ko
						{loading && (
							<>
								<span className="mx-1">-</span>
								{timeLeft} secondes restantes
							</>
						)}
					</p>
					{loading && (
						<Progress
							value={progress}
							className="mt-4 h-1 w-full bg-white [&>*]:bg-purple"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
																														 accept,
																														 maxSize,
																														 onFileSelect
																													 }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const [timeLeft, setTimeLeft] = useState(3);

	React.useEffect(() => {
		let progressInterval: NodeJS.Timeout;
		let timeInterval: NodeJS.Timeout;

		if (selectedFile) {
			// Réinitialiser les états
			setProgress(0);
			setLoading(true);
			setTimeLeft(1); // Changé à 1 seconde

			// Gérer la progression - ajusté pour 1 seconde
			progressInterval = setInterval(() => {
				setProgress(prev => {
					if (prev >= 100) {
						clearInterval(progressInterval);
						setLoading(false);
						return 100;
					}
					return prev + 4; // Augmenté pour atteindre 100 en ~1 seconde (25 incréments de 4%)
				});
			}, 40); // 1000ms/25 = 40ms par incrément

			// Gérer le compte à rebours
			timeInterval = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 0) {
						clearInterval(timeInterval);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => {
			clearInterval(progressInterval);
			clearInterval(timeInterval);
		};
	}, [selectedFile]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file && file.size <= maxSize) {
				setSelectedFile(file);
				onFileSelect(file);
			}
		},
		[maxSize, onFileSelect]
	);

	const removeFile = () => {
		setSelectedFile(null);
		onFileSelect(null);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
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
					"rounded-xl border border-dashed",
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
				<FilePreview
					file={selectedFile}
					onRemove={removeFile}
					progress={progress}
					timeLeft={timeLeft}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default DocumentUploader;