const AppLayout = ({ children }: { children: React.ReactNode | Array<React.ReactNode> }) => {
  return (
    <div className={"flex min-h-screen flex-col items-center justify-center"}>
      <div className={"flex min-h-[450px] w-2/4 flex-col items-center justify-center space-y-8"}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
