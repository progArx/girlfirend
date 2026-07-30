import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Letter.css";

export default function LetterAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <div id="root"> 
    <div className="page">
      <div
        className="envelope"
        onClick={() => setIsOpen((s) => !s)}
        role="button"
        aria-pressed={isOpen}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsOpen((s) => !s); }}
      >
        {/* เนื้อจดหมาย */}
        <motion.div
          className="letter"
          initial={{ y: 0, opacity: 0 }}
          animate={isOpen ? { y: -10, opacity: 1 } : { y: 0, opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="letter-title">สุขสันต์วันวาเลนไทน์</h2>
          <p className="letter-body">ข้อความในจดหมายของคุณ... ฉันรักเธอเสมอ 💖</p>
        </motion.div>

        {/* ฝาซอง */}
        <motion.div
          className="flap"
          initial={false}
          animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 0.45 }}
          style={{ transformOrigin: "top center" }}
        />
      </div>
    </div>
   </div>
  );
}
