const stations = [
  { id: "ai", label: "AI / MODEL SYSTEMS" },
  { id: "web", label: "WEB / PRODUCT SYSTEMS" },
  { id: "cyber", label: "CYBER / DEFENSE SYSTEMS" },
  { id: "glitch", label: "GLITCH / GAME SYSTEMS" },
];

export default function ControlRoom({ mission, roomRef, progressRef }) {
  return (
    <div className="sigc-room-scene" aria-hidden="true">
      <div className="sigc-room-stars" />
      <div className="sigc-room-wall" ref={roomRef}>
        <div className="sigc-room-window">
          <div className="sigc-room-window-grid" />
          <div className="sigc-room-horizon" />
          <span className="sigc-room-window-label">AMRITAPURI / OBSERVATION BAY</span>
        </div>

        <div className="sigc-side-console sigc-side-console-left">
          <span className="sigc-room-label">SYSTEMS / 04</span>
          <div className="sigc-console-readouts">
            <i /><i /><i /><i />
          </div>
          <div className="sigc-room-lights"><i /><i /><i /></div>
        </div>

        <div className="sigc-side-console sigc-side-console-right">
          <span className="sigc-room-label">ACTIVE CHANNEL</span>
          <strong>{mission.station}</strong>
          <span className="sigc-room-caption">{mission.signal}</span>
          <div className="sigc-room-readout">
            <i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>

        <div className="sigc-workstation">
          <div className="sigc-monitor sigc-monitor-main">
            <div className="sigc-monitor-topline">
              <span>ACM AMRITAPURI / MISSION DISPLAY</span>
              <span>CH 0{mission.index + 1}</span>
            </div>
            <div className="sigc-monitor-view">
              <div className="sigc-monitor-grid" />
              <div className={`sigc-monitor-signal sigc-monitor-signal-${mission.id}`}>
                {mission.id === "ai" && <><i /><i /><i /><i /><i /><i /><i /><span>MODEL GRAPH</span></>}
                {mission.id === "web" && <><span>PRODUCT / BUILD STATUS</span><i /><i /><i /><i /></>}
                {mission.id === "cyber" && <><b>SECURE</b><i /><i /><i /><i /></>}
                {mission.id === "glitch" && <><span>PLAYER 01 / READY</span><i /></>}
              </div>
            </div>
            <div className="sigc-monitor-status"><i /> SIGNAL NOMINAL <span>{mission.station}</span></div>
          </div>

          <div className="sigc-monitor sigc-monitor-telemetry">
            <div className="sigc-monitor-topline"><span>TELEMETRY</span><span>LIVE</span></div>
            <div className="sigc-telemetry-bars">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="sigc-telemetry-readout">PACKETS / 048.2</div>
          </div>

          <div className="sigc-desk">
            <div className="sigc-desk-edge" />
            <div className="sigc-keyboard">
              {Array.from({ length: 3 }, (_, row) => (
                <div key={row}>{Array.from({ length: 10 }, (_, key) => <i key={key} />)}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="sigc-room-foot">
          <span>ACM / CONTROL ROOM</span>
          <span className="sigc-room-progress"><i ref={progressRef} /></span>
          <span>MISSION {String(mission.index + 1).padStart(2, "0")} / 04</span>
        </div>
      </div>
      <div className="sigc-station-signal">
        {stations.map((station) => (
          <span className={station.id === mission.id ? "is-active" : ""} key={station.id}>
            {station.label}
          </span>
        ))}
      </div>
    </div>
  );
}
