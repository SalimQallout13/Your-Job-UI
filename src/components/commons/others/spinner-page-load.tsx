
const SpinnerPageLoad = () => {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-primary-foreground bg-opacity-75">
      <div className="spinner absolute inset-0 z-30"></div>
    </div>
  );
};

export default SpinnerPageLoad;
