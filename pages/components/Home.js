const LandingPage = () => {
    useEffect(() => {
      // Add your animation logic here
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`flex flex-col items-center justify-center h-full bg-${colors.primary}`}
      >
        <h1 className={`text-4xl font-bold text-white`}>Welcome to My Landing Page</h1>
        <p className={`text-lg text-white mt-4`}>Enjoy the framer motion animation!</p>
      </motion.div>
    );
  };

  export default LandingPage;