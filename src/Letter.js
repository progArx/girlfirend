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
          <h2 className="letter-title">ถึงคนที่ทำให้หัวใจเค้าเต้นแรงทุกครั้งที่คิดถึง</h2>
          <p className="letter-body">เค้าคิดถึงที่รักมากๆ แล้วก็รู้สึกว่ามันคงไม่พอถ้าไม่บอกออกมาเป็นคำพูดตรงๆ ว่าที่รักสำคัญกับเค้ามากแค่ไหน
ที่รักทำให้เรื่องเล็กๆ มีความหมาย คอยอยู่กับเค้าในวันที่เค้าอ่อนแอ ทุกอย่างมันอบอุ่นและมีค่ามากๆสำหรับเค้า เค้าทำสิ่งเล็กๆ นี้มาเพื่อบอกที่รักว่าทีรักสำคัญกับเค้ามากแค่ไหน ไม่ใช่แค่คำพูด เค้าอยากให้เราเติบโตไปด้วยกัน เรียนรู้กันและกันมากขึ้น เข้าใจกันมากขึ้น และรักกันมากขึ้นในทุก ๆ ปี
  เค้ารักที่รักมากๆนะ 💖</p>
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
