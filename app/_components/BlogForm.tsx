"use client";

import { useActionState, useRef, useState } from "react";
import { submitBlogAction, BlogFormState } from "@/app/_lib/action";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function BlogForm() {
	const [state, action, isPending] = useActionState<BlogFormState, FormData>(
		submitBlogAction,
		{},
	);

	const [coverImage, setCoverImage] = useState(
		state.values?.coverImage ?? "",
	);

	// // ---- Success state -------------------------------------------------------
	// if (state.success) {
	// 	return (
	// 		<div className="max-w-2xl mx-auto mt-16 px-4 text-center">
	// 			<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
	// 				<svg
	// 					width="28"
	// 					height="28"
	// 					viewBox="0 0 24 24"
	// 					fill="none"
	// 					stroke="#16a34a"
	// 					strokeWidth="2.5"
	// 				>
	// 					<path d="M20 6 9 17l-5-5" />
	// 				</svg>
	// 			</div>
	// 			<h2 className="text-2xl font-bold text-slate-900 mb-2">
	// 				{state.message}
	// 			</h2>
	// 			<p className="text-slate-500 mb-8">
	// 				Your blog post has been published.
	// 			</p>
	// 			<button
	// 				onClick={() => window.location.reload()}
	// 				className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
	// 			>
	// 				Write another post
	// 			</button>
	// 		</div>
	// 	);
	// }

	// ---- Form ----------------------------------------------------------------
	return (
		<div className="min-h-screen bg-slate-50 py-12 px-4">
			<div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
				{/* Header */}
				<div className="px-10 pt-8 pb-6 border-b border-slate-100">
					<div className="flex items-center gap-2.5 mb-1.5">
						<div className="w-2 h-6 bg-indigo-500 rounded-full" />
						<span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
							New Post
						</span>
					</div>
					<h1 className="text-3xl text-slate-900 leading-tight font-normal m-0">
						Create Blog Post
					</h1>
					<p className="text-slate-500 mt-2 text-[0.9375rem]">
						Fill in the details below to publish your article.
					</p>
				</div>

				{/* Form */}
				<form action={action} className="px-10 py-8">
					<div className="flex flex-col gap-6">
						{/* Cover Image */}
						<div>
							<Label htmlFor="coverImage" required>
								Cover Image
							</Label>
							<CoverImageUpload
								value={coverImage}
								onChange={setCoverImage}
								error={state.errors?.coverImage}
							/>
						</div>

						{/* Title */}
						<div>
							<Label htmlFor="title" required>
								Title
							</Label>
							<Input
								id="title"
								name="title"
								type="text"
								placeholder="Enter a compelling title…"
								defaultValue={state.values?.title ?? ""}
								aria-describedby="title-error"
								hasError={!!state.errors?.title}
							/>
							<FieldError messages={state.errors?.title} />
						</div>

						{/* Description */}
						<div>
							<Label htmlFor="description" required>
								Description
							</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="A short summary shown in previews and search results…"
								defaultValue={state.values?.description ?? ""}
								rows={3}
								hasError={!!state.errors?.description}
							/>
							<FieldError messages={state.errors?.description} />
						</div>

						{/* Content */}
						<div>
							<Label htmlFor="content" required>
								Content
							</Label>
							<Textarea
								id="content"
								name="content"
								placeholder="Write your article content here… (Markdown is supported)"
								defaultValue={state.values?.content ?? ""}
								rows={10}
								hasError={!!state.errors?.content}
								className="min-h-64"
							/>
							<FieldError messages={state.errors?.content} />
						</div>

						{/* Divider */}
						<hr className="border-slate-100" />

						{/* Actions */}
						<div className="flex justify-end gap-3">
							<button
								type="reset"
								onClick={() => setCoverImage("")}
								className="px-5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-500 font-medium text-[0.9375rem] cursor-pointer hover:bg-slate-50 transition-colors duration-150"
							>
								Reset
							</button>

							<button
								type="submit"
								disabled={isPending}
								className="flex items-center gap-2 px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-px active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-[0.9375rem] rounded-lg cursor-pointer shadow-sm shadow-indigo-300 transition-all duration-150"
							>
								{isPending ? (
									<>
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											className="animate-spin"
										>
											<path d="M21 12a9 9 0 1 1-6.219-8.56" />
										</svg>
										Publishing…
									</>
								) : (
									<>
										Publish Post
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
										>
											<path d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									</>
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Reusable primitives
// ---------------------------------------------------------------------------
function Label({
	htmlFor,
	children,
	required,
}: {
	htmlFor: string;
	children: React.ReactNode;
	required?: boolean;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="block text-sm font-medium text-slate-900 mb-1.5 tracking-tight"
		>
			{children}
			{required && <span className="text-red-500 ml-1">*</span>}
		</label>
	);
}

function FieldError({ messages }: { messages?: string[] }) {
	if (!messages?.length) return null;
	return (
		<p
			role="alert"
			className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="shrink-0"
			>
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
			</svg>
			{messages[0]}
		</p>
	);
}

const inputClasses = (hasError?: boolean) =>
	[
		"w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-[0.9375rem]",
		"outline-none transition-all duration-150",
		"focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/15",
		"placeholder:text-slate-400",
		hasError ? "border-red-500" : "border-slate-200",
	].join(" ");

function Input({
	hasError,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
	return <input {...props} className={inputClasses(hasError)} />;
}

function Textarea({
	hasError,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
	return (
		<textarea
			{...props}
			className={[
				inputClasses(hasError),
				"resize-y leading-relaxed",
				props.className ?? "",
			].join(" ")}
		/>
	);
}

// ---------------------------------------------------------------------------
// Cover image upload widget
// ---------------------------------------------------------------------------
function CoverImageUpload({
	value,
	onChange,
	error,
}: {
	value: string;
	onChange: (url: string) => void;
	error?: string[];
}) {
	const fileRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	const handleFile = (file: File) => {
		if (!file.type.startsWith("image/")) return;
		onChange(URL.createObjectURL(file));
	};

	const zoneClasses = [
		"relative flex items-center justify-center min-h-44 rounded-xl border-2 border-dashed",
		"cursor-pointer overflow-hidden transition-all duration-200",
		dragging
			? "border-indigo-500 bg-indigo-50"
			: error?.length
				? "border-red-500 bg-slate-50"
				: "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40",
	].join(" ");

	return (
		<div>
			<input
				ref={fileRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={(e) => {
					const f = e.target.files?.[0];
					if (f) handleFile(f);
				}}
			/>
			<input type="hidden" name="coverImage" value={value} />

			<div
				className={zoneClasses}
				onClick={() => fileRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={(e) => {
					e.preventDefault();
					setDragging(false);
					const f = e.dataTransfer.files?.[0];
					if (f) handleFile(f);
				}}
			>
				{value ? (
					<>
						<Image
							src={value}
							alt="Cover preview"
							width={1920}
							height={1080}
							className="w-full h-44 object-cover block"
						/>
						<div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
							<span className="text-white font-semibold text-sm">
								Change image
							</span>
						</div>
					</>
				) : (
					<div className="text-center p-8 text-slate-400">
						<svg
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							className="mx-auto mb-3"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" />
							<circle cx="8.5" cy="8.5" r="1.5" />
							<path d="m21 15-5-5L5 21" />
						</svg>
						<p className="font-medium text-slate-500 mb-1">
							Click or drag to upload cover
						</p>
						<p className="text-xs">PNG, JPG, WEBP up to 10 MB</p>
					</div>
				)}
			</div>

			<FieldError messages={error} />
		</div>
	);
}
