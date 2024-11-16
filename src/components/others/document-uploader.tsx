import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils/utils.ts"

interface DocumentUploaderProps {
	accept: string;
	maxSize: number;
	onFileSelect: (file: File | null) => void;
	children?: React.ReactNode;
}

interface FilePreviewProps {
	file: File;
	onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(true);
	const [timeLeft, setTimeLeft] = useState(3);

	React.useEffect(() => {
		let progressInterval: NodeJS.Timeout;
		let timeInterval: NodeJS.Timeout;

		if (loading) {
			progressInterval = setInterval(() => {
				setProgress(prev => {
					if (prev >= 100) {
						clearInterval(progressInterval);
						setLoading(false);
						return 100;
					}
					return prev + 2;
				});
			}, 50);

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
	}, [loading]);

	return (
		<div className="mt-4 rounded-lg bg-gray-50 p-4">
			<div className="relative flex items-start gap-3">
				<FileIcon className="mt-1 size-5 shrink-0 text-gray-400" />
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700">{file.name}</p>
						<button
							onClick={onRemove}
							className="rounded-full p-1 hover:bg-gray-200"
						>
							<X className="size-4 text-gray-500" />
						</button>
					</div>
					<p className="text-xs text-gray-500">
						{(file.size / 1024).toFixed(0)} ko
					</p>
					{loading && (
						<>
							<Progress
								value={progress}
								className="mt-2 h-1"
							/>
							<p className="mt-1 text-right text-xs text-gray-500">
								{timeLeft} secondes restantes
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
																														 accept,
																														 maxSize,
																														 onFileSelect,
																													 }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
		multiple: false,
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
						<p>Glissez-déposez ou <span className="text-purple">choisissez un fichier</span> à télécharger</p>
					</div>
				</div>
			</div>

			{selectedFile && (
				<FilePreview
					file={selectedFile}
					onRemove={removeFile}
				/>
			)}
		</div>
	);
};

export default DocumentUploader;