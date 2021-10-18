export interface LoaderProps {
  style?: React.CSSProperties;
  size?: number;
  styleName?: string;
  className?: string;
}

function Loader(props: LoaderProps) {
  const height = `${props.size}px`;
  const width = `${props.size}px`;

  return (
    <div style={props.style} className={props.className}>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-dual-ring"
        style={{ background: 'none' }}
      >
        <circle
          cx="50"
          cy="50"
          ng-attr-r="{{config.radius}}"
          ng-attr-stroke-width="{{config.width}}"
          ng-attr-stroke="{{config.stroke}}"
          ng-attr-stroke-dasharray="{{config.dasharray}}"
          fill="none"
          strokeLinecap="round"
          r="40"
          strokeWidth="10"
          stroke="var(--color-blue)"
          strokeDasharray="62.83185307179586 62.83185307179586"
          transform="rotate(63.8822 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

Loader.defaultProps = {
  size: 50,
  className: '',
};

export default Loader;
