const Spinner = () => {
    return (
        <svg version="1.0" width="64px" height="64px" viewBox="0 0 128 128" style={{margin: '0 auto', display: 'block', background: 'none'}} xmlSpace="preserve">
            <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
            <g>
                <circle cx="16" cy="64" r="16" fill="#000000" />
                <circle cx="16" cy="64" r="16" fill="#555555" transform="rotate(45,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#949494" transform="rotate(90,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#cccccc" transform="rotate(135,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e1e1" transform="rotate(180,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e1e1" transform="rotate(225,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e1e1" transform="rotate(270,64,64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e1e1" transform="rotate(315,64,64)" />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                    calcMode="discrete"
                    dur="720ms"
                    repeatCount="indefinite"
                />
            </g>
        </svg>
    );
};

export default Spinner;
