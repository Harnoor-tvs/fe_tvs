

function Home() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 80px)", // fills screen minus header
        overflow: "hidden",
      }}
    >
      <img
        src="/tvs-banner.webp"
        alt="TVS Banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default Home;
