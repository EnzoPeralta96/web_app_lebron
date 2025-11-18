import { createContext, useContext, useEffect, useMemo, useState } from "react";
import productos from "../data/productos.json";

const CartContext = createContext(null);

const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
    if (!product || !product.id) return;
    const getStockFor = (id) => {
      const p = productos.find((x) => String(x.id) === String(id));
      return Math.max(0, p?.stock ?? Number.MAX_SAFE_INTEGER);
    };
    setItems((prev) => {
      const next = [...prev];
      const ix = next.findIndex((i) => String(i.id) === String(product.id));
      const max = getStockFor(product.id);
      if (ix !== -1) {
        const newQty = Math.min(max, Math.max(1, (next[ix].qty || 1) + qty));
        next[ix] = { ...next[ix], qty: newQty, stock: max };
      } else {
        const base = {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagen,
          stock: max,
        };
        next.push({ ...base, qty: Math.min(max, Math.max(1, qty)) });
      }
      return next;
    });
  };

  const updateQty = (id, qty) => {
    const getStockFor = (pid) => {
      const p = productos.find((x) => String(x.id) === String(pid));
      return Math.max(0, p?.stock ?? Number.MAX_SAFE_INTEGER);
    };
    setItems((prev) => {
      const next = prev
        .map((i) => {
          if (String(i.id) !== String(id)) return i;
          const max = i.stock ?? getStockFor(id);
          const clamped = Math.min(max, Math.max(0, qty));
          return { ...i, qty: clamped, stock: max };
        })
        .filter((i) => i.qty > 0);
      return next;
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const [couponCode, setCouponCode] = useState("");

  const calculateCouponDiscount = (rawTotal, code) => {
    if (!code) return 0;
    if (code.trim().toUpperCase() === "LEBRON10") {
      return rawTotal * 0.1;
    }
    return 0;
  };

  const { count, total } = useMemo(() => {
    const count = items.reduce((acc, i) => acc + (i.qty || 1), 0);
    const total = items.reduce((acc, i) => acc + (i.precio || 0) * (i.qty || 1), 0);
    return { count, total };
  }, [items]);

  const couponDiscount = useMemo(
    () => calculateCouponDiscount(total, couponCode),
    [total, couponCode]
  );

  const totalWithDiscount = useMemo(
    () => Math.max(0, total - couponDiscount),
    [total, couponDiscount]
  );

  const applyCoupon = (code) => {
    setCouponCode(code);
  };

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      count,
      total,
      couponCode,
      couponDiscount,
      totalWithDiscount,
      applyCoupon,
    }),
    [items, count, total, couponCode, couponDiscount, totalWithDiscount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
