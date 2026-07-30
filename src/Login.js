import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintStyle, setHintStyle] = useState({});
  const hintTimeoutRef = useRef(null);
  const hintBtnRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "16042569") navigate("/home");
    else setError("รหัสไม่ถูกต้อง 💔");
  };

  const handleHint = () => {
    // เคลียร์ timeout เก่า (ถ้ามี)
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }

    // คำนวณตำแหน่ง tooltip จากปุ่ม
    const btn = hintBtnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      // วาง tooltip เหนือปุ่ม ถ้ามีพื้นที่ไม่พอ ให้วางใต้ปุ่ม
      const spaceAbove = rect.top;
      const topPos = spaceAbove > 60 ? rect.top - 10 : rect.bottom + 10;
      const leftPos = rect.left + rect.width / 2;

      // แปลงเป็นตำแหน่งสัมพัทธ์ภายใน viewport (ใช้ translate เพื่อกึ่งกลาง)
      setHintStyle({
        position: "fixed",
        top: `${topPos}px`,
        left: `${leftPos}px`,
        transform: "translate(-50%, -100%)",
      });
    }

    setShowHint(true);
    // ซ่อนหลัง 3 วินาที
    hintTimeoutRef.current = setTimeout(() => {
      setShowHint(false);
      hintTimeoutRef.current = null;
      console.log("Hint hidden after 3 seconds");
    }, 3000);

    console.log("Hint button clicked");
  };

  return (
    <div className="page-bg">
      <div className="center-frame">
        <div className="left-col">
          <h1 className="frame-title">Hey pretty, what's the magic word? ❤️</h1>
          <p className="frame-sub">ใส่รหัสลับแล้วกด Enter เพื่อรับเซอร์ไพรส์</p>

          <form className="frame-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="password"
                className="large-input"
                placeholder="Enter your secret..."
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                autoFocus
              />

              <button
                type="button"
                ref={hintBtnRef}
                className="hint-btn"
                onClick={handleHint}
                aria-label="Show hint"
                title="คำใบ้"
              >
                ?
              </button>
            </div>

            <div className="btn-wrap">
              <button type="submit" className="btn2 pink-btn2">Enter</button>
            </div>
          </form>

          {error && <div className="error">{error}</div>}
        </div>
      </div>

      {/* Tooltip แยกออกมาจาก DOM ของ form เพื่อไม่ถูก overflow */}
      {showHint && (
        <div className="hint-tooltip visible" style={hintStyle} role="status" aria-live="polite">
          คำใบ้: วันครบรอบของเรา (DD/MM/YYYY) 💖
        </div>
      )}
    </div>
  );
}
