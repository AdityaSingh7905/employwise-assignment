const Loading = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">{props.change}</p>
      </div>
    </div>
  );
};

export default Loading;
