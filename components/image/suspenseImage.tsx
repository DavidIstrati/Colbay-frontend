import {useImage} from 'react-image'

interface SuspenseImage {
    imageSrc: string;
    alt?: string;
    className?: string;
}

export default function SuspenseImage({imageSrc, alt, className}: SuspenseImage) {
  const {src} = useImage({
    srcList: imageSrc,
  })

  return <img src={src} alt={alt} className={className}/>
}