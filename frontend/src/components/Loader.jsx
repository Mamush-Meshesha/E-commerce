import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

const Loader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const waveVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "400px" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* Main Loading Spinner */}
        <motion.div
          variants={pulseVariants}
          className="position-relative mb-4"
          style={{ width: "80px", height: "80px", margin: "0 auto" }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid var(--primary-color)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <motion.div
            variants={waveVariants}
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              width: "60px",
              height: "60px",
              border: "3px solid rgba(102, 126, 234, 0.3)",
              borderTop: "3px solid var(--secondary-color)",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite reverse",
            }}
          />
        </motion.div>

        {/* Loading Dots */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              className="rounded-circle"
              style={{
                width: "12px",
                height: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                animation: `pulse 1.5s ease-in-out infinite ${index * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-primary fw-bold"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Loading Amazing Products...
        </motion.h4>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-3"
          style={{ width: "200px", margin: "0 auto" }}
        >
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "#f3f3f3",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "2px",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="position-absolute"
          style={{
            top: "20%",
            left: "10%",
            width: "20px",
            height: "20px",
            background: "rgba(102, 126, 234, 0.3)",
            borderRadius: "50%",
            animation: "float 3s ease-in-out infinite",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="position-absolute"
          style={{
            top: "30%",
            right: "15%",
            width: "15px",
            height: "15px",
            background: "rgba(118, 75, 162, 0.3)",
            borderRadius: "50%",
            animation: "float 3s ease-in-out infinite reverse",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </Container>
  );
};

export default Loader;
