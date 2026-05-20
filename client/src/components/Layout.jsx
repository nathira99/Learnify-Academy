function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-2">
        {children}
      </div>
    </div>
  );
}

export default Layout;