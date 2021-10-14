import avtr001Img from '~/assets/avatars/avtr001.png';
import avtr002Img from '~/assets/avatars/avtr002.png';
import avtr003Img from '~/assets/avatars/avtr003.png';
import avtr004Img from '~/assets/avatars/avtr004.png';
import avtr005Img from '~/assets/avatars/avtr005.png';

const userMap: {
  [key: string]: {
    userId: string;
    name: string;
    avatar: typeof avtr001Img;
  };
} = {
  avtr001: {
    userId: 'avtr001',
    name: 'John',
    avatar: avtr001Img,
  },
  avtr002: {
    userId: 'avtr002',
    name: 'Jane',
    avatar: avtr002Img,
  },
  avtr003: {
    userId: 'avtr003',
    name: 'Joe',
    avatar: avtr003Img,
  },
  avtr004: {
    userId: 'avtr004',
    name: 'Tom',
    avatar: avtr004Img,
  },
  avtr005: {
    userId: 'avtr005',
    name: 'Harry ',
    avatar: avtr005Img,
  },
};

export default userMap;
