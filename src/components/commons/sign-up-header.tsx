
type SignupHeaderProps = {
	title: string;
	description: string;
};

export const SignUpHeader = ({ title, description }: SignupHeaderProps) => (
	<div className="pt-4 text-center xl:text-left">
		<h2 className="mb-6 text-3xl font-semibold text-black-primary">{title}</h2>
		<p className="text-lg text-gray-600">{description}</p>
	</div>
);