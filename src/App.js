import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const boxRef = useRef(null);
  const pinkRef = useRef(null);   // ปุ่ม "รัก"
  const grayRef = useRef(null);   // ปุ่ม "ไม่รัก"
  const titleRef = useRef(null);  // หัวข้อ
  const navigate = useNavigate();

  // เก็บตำแหน่งปุ่มเทาเป็น style absolute
  const [pos, setPos] = useState({ top: 40, left: 200 });

  const moveButton = () => {
    const box = boxRef.current;
    const pink = pinkRef.current;
    const gray = grayRef.current;
    const title = titleRef.current;
    if (!box || !pink || !gray) return;

    // ขนาดและตำแหน่งภายในกรอบ (relative to box)
    const boxRect = box.getBoundingClientRect();
    const pinkRect = pink.getBoundingClientRect();
    const grayRect = gray.getBoundingClientRect();
    const titleRect = title ? title.getBoundingClientRect() : null;

    // ขนาดปุ่ม (ใช้ขนาดจริงจาก DOM)
    const btnWidth = grayRect.width || 120;
    const btnHeight = grayRect.height || 60;

    // ขอบเขตที่อนุญาตภายในกรอบ (เว้น padding 12px)
    const padding = 12;
    const minLeft = padding;
    const maxLeft = Math.max( padding, boxRect.width - btnWidth - padding );
    const minTop = padding;
    const maxTop = Math.max( padding, boxRect.height - btnHeight - padding );

    // แปลง rect ขององค์ประกอบอื่นเป็น relative coordinates ภายใน box
    const toRelative = (r) => ({
      left: r.left - boxRect.left,
      top: r.top - boxRect.top,
      right: r.right - boxRect.left,
      bottom: r.bottom - boxRect.top,
    });

    const pinkRel = toRelative(pinkRect);
    const titleRel = titleRect ? toRelative(titleRect) : null;

    // ฟังก์ชันตรวจ overlap
    const isOverlap = (r1, r2) => {
      return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
    };

    // สุ่มตำแหน่งจนไม่ทับ title หรือ pink button และไม่ใกล้เกินไป
    let attempts = 0;
    let newTop = pos.top;
    let newLeft = pos.left;
    const safeDistance = 80; // ระยะห่างขั้นต่ำจากปุ่มชมพู

    do {
      attempts++;
      newTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
      newLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;

      const candidateRect = {
        left: newLeft,
        top: newTop,
        right: newLeft + btnWidth,
        bottom: newTop + btnHeight,
      };

      // ตรวจ overlap กับ title
      const overlapTitle = titleRel ? isOverlap(candidateRect, titleRel) : false;
      // ตรวจ overlap กับ pink
      const overlapPink = isOverlap(candidateRect, pinkRel);
      // ตรวจระยะห่างจากจุดกึ่งกลาง pink
      const pinkCenter = { x: (pinkRel.left + pinkRel.right) / 2, y: (pinkRel.top + pinkRel.bottom) / 2 };
      const candCenter = { x: (candidateRect.left + candidateRect.right) / 2, y: (candidateRect.top + candidateRect.bottom) / 2 };
      const dist = Math.hypot(candCenter.x - pinkCenter.x, candCenter.y - pinkCenter.y);

      // ถ้าไม่ทับและไกลพอ ให้รับตำแหน่ง
      if (!overlapTitle && !overlapPink && dist >= safeDistance) break;

      // ป้องกัน loop ไม่รู้จบ
      if (attempts > 200) {
        // ถ้าไม่เจอที่ปลอดภัย ให้วางตำแหน่ง fallback ที่มุมขวาล่างภายในกรอบ
        newLeft = maxLeft;
        newTop = maxTop;
        break;
      }
    } while (true);

    setPos({ top: newTop, left: newLeft });
  };

  const goNextPage = () => {
    navigate("/letter");
  };

  return (
    <div className="page-bg">
      <div className="box" ref={boxRef}>
        <h1 className="box-title" ref={titleRef}>ที่รัก รักเค้าไหม? ❤️</h1>

        <div className="button-row">
          <button
            ref={pinkRef}
            className="btn pink-btn"
            onClick={goNextPage}
            type="button"
          >
            รัก
          </button>

          <button
            ref={grayRef}
            className="btn gray-btn"
            type="button"
            onClick={moveButton}
            style={{
              position: "absolute",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
            }}
          >
            ไม่รัก
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
