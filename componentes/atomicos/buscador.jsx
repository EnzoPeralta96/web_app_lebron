import React, { useMemo, useRef, useState, useEffect } from "react";
import "../../assets/css/atomicos/buscador.css";

// Buscador: control interno y control por props compatibles.
// El input ocupa el 100% del contenedor cuando no está en fase "done".

export default function Buscador({
    placeholder = "Buscar...",
    value,
    onChange,
    onSubmit,
    className = "",
    ariaLabel = "Buscar",
    suggestions = ["proteinas", "creatinas", "aminoacidos", "vitaminas"], // Sugerencias de ejemplo
}) {
    const [internal, setInternal] = useState("");
    const [focused, setFocused] = useState(false);
    // Fases: "prepare" | "submit" | "animate" | "done" | "reset" | ""
    const [phase, setPhase] = useState("");

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const timersRef = useRef([]);

    // Sugerencias saneadas (evita caracteres rotos)
    const defaultSugs = ["Proteínas", "Proteinas", "Whey Protein", "Creatinas", "Aminoácidos", "Vitaminas"];
    const isBroken = (arr) => !Array.isArray(arr) || arr.length === 0 || arr.join("").includes("\uFFFD");
    const sugList = isBroken(suggestions) ? defaultSugs : suggestions;

    const val = value !== undefined ? value : internal;
    const hasText = val && val.trim().length > 0;
    // Coincidencias: sin tildes y case-insensitive
    const normalize = (s) => (s || "").toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = normalize((val || "").trim());
    const matches = q.length > 0 ? sugList.filter((s) => normalize(s).includes(q)) : [];
    // Solo mostrar cuando hay foco, texto y coincidencias
    const showList = focused && hasText && matches.length > 0;

    // Lógica de la secuencia de animación (Submit y Reset)
    useEffect(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        if (phase === "prepare") {
            // Inicia la secuencia de búsqueda
            timersRef.current.push(setTimeout(() => setPhase("submit"), 10));
            timersRef.current.push(setTimeout(() => setPhase("prepare"), 200));
            timersRef.current.push(setTimeout(() => setPhase("animate"), 1250));
            // Final de la animación, muestra la lista
            timersRef.current.push(setTimeout(() => setPhase("done"), 2050));

        } else if (phase === "reset") {
            // Animación de retroceso CSS dura ~1.5s. Luego limpiamos el estado.
            timersRef.current.push(setTimeout(() => {
                setPhase("");
            }, 1600)); // Esperamos a que la animación CSS termine.
        }

        return () => timersRef.current.forEach(clearTimeout);
    }, [phase]);

    const handleChange = (e) => {
        if (onChange) onChange(e);
        else setInternal(e.target.value);
    };

    // Helper para establecer el valor respetando el control por props
    const setValue = (newVal) => {
        if (onChange) onChange({ target: { value: newVal } });
        else setInternal(newVal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(val);
        setFocused(false);
        setPhase("");
        inputRef.current?.blur();
    };

    const handleIconClick = (e) => {
        e.preventDefault();
        // Evita que el botón gane foco (para que :focus-within no se mantenga)
        e.currentTarget.blur();
        if (hasText) {
            // Limpiar y cerrar
            setValue("");
            setFocused(false);
            setPhase("");
            inputRef.current?.blur();
            if (containerRef.current && document.activeElement && containerRef.current.contains(document.activeElement)) {
                try { document.activeElement.blur(); } catch {}
            }
        } else if (focused) {
            // Ya está abierto pero vacío: cerrar/colapsar
            setFocused(false);
            setPhase("");
            // Asegura que se quite el foco del input
            setTimeout(() => {
                inputRef.current?.blur();
                if (containerRef.current && document.activeElement && containerRef.current.contains(document.activeElement)) {
                    try { document.activeElement.blur(); } catch {}
                }
            }, 0);
        } else {
            // Abrir y enfocar
            inputRef.current?.focus();
            setFocused(true);
        }
    };

    const handleClear = () => {
        setValue("");
        setFocused(false);
        setPhase("");
        inputRef.current?.blur();
    };

    const classes = useMemo(() => {
        return [
            "lb-search",
            focused && phase === "" ? "is-focus" : "", // Focus solo cuando no hay animación
            phase && `is-${phase}`,
            className,
        ]
            .filter(Boolean)
            .join(" ");
    }, [focused, phase, className]);

    return (
        <form
            ref={containerRef}
            className={classes}
            role="search"
            aria-label={ariaLabel}
            onSubmit={handleSubmit}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setFocused(false);
                    // Responsive: al hacer click afuera en mobile, limpiar y cerrar
                    try {
                        if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
                            setValue("");
                            setPhase("");
                        }
                    } catch {}
                }
            }}
        >
            {/* Barra izquierda + icono */}
            <span className="lb-bar" aria-hidden={true}>
                <button type="button" className="lb-icon-btn" tabIndex={-1}
                    aria-label={hasText ? "Limpiar" : "Buscar"}
                    onMouseDown={(e) => e.preventDefault()} // evita que el botón obtenga foco
                    onClick={handleIconClick}
                >
                    <span className="lb-icon" />
                </button>
                {/* Muestra el texto cuando la animación de "done" está activa */}
                {phase === "done" && hasText ? (
                    <span className="lb-bar-text">{val}</span>
                ) : null}
            </span>

            <input
                className="lb-search-input"
                type="text"
                placeholder={placeholder}
                value={val}
                onChange={handleChange}
                aria-label={ariaLabel}
                role="searchbox"
                inputMode="search"
                ref={inputRef}
                onKeyDown={(e) => { if (e.key === 'Escape') handleClear(); }}
            />

            {/* Eliminamos la X pequeña para evitar duplicados; el círculo actúa como limpiar */}

            {showList && (
                <ul className="lb-suggest">
                    {matches.map((sug) => (
                        <li key={sug}>
                            <button
                                type="button"
                                onClick={() => {
                                    setValue(sug);
                                    if (onSubmit) onSubmit(sug);
                                    setFocused(false);
                                    setPhase("");
                                    inputRef.current?.blur();
                                }}
                            >
                                {sug}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}
