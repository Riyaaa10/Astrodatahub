export const Textarea = ({ placeholder, ...props }) => {
    return (
      <textarea
        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        {...props}
      ></textarea>
    );
  };
  