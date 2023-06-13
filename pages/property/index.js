const index = () => {
  const pictures = [
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    'https://magictoolbox.sirv.com/images/magicslideshow/03/image-slideshow-04.jpg?scale.width=2000',
    // Add more picture URLs as needed
  ];
  return (
    <div className="flex overflow-x-scroll h-[500px]">
      <div className="w-1/2 h-full pr-3">
        <div
          style={{ backgroundImage: `url(${pictures[0]})` }}
          className="h-full w-full bg-cover bg-no-repeat"
        />
      </div>
      <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3">
        {pictures.map((picture, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${picture})` }}
            className=" h-full bg-cover bg-no-repeat"
          />
        ))}
      </div>
    </div>
  );
};

export default index;
