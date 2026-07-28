const GUEST_ID_KEY = 'playnest_guest_id';
const GUEST_NAME_KEY = 'playnest_guest_name';

const ADJECTIVES = ['Super', 'Cyber', 'Speedy', 'Clever', 'Cosmic', 'Shadow', 'Mystic', 'Golden', 'Apex', 'Hyper'];
const ANIMALS = ['Fox', 'Dragon', 'Owl', 'Tiger', 'Falcon', 'Panther', 'Phoenix', 'Panda', 'Wolf', 'Viper'];

export function getOrCreateGuestUser(): { guestId: string; nickname: string } {
  if (typeof window === 'undefined') {
    return { guestId: 'guest_server', nickname: 'Guest Gamer' };
  }

  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = 'guest_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4);
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  let nickname = localStorage.getItem(GUEST_NAME_KEY);
  if (!nickname) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const num = Math.floor(100 + Math.random() * 900);
    nickname = `${adj}${animal}#${num}`;
    localStorage.setItem(GUEST_NAME_KEY, nickname);
  }

  return { guestId, nickname };
}

export function setGuestNickname(newNickname: string): string {
  if (typeof window !== 'undefined' && newNickname.trim().length > 0) {
    const sanitized = newNickname.trim().substring(0, 20);
    localStorage.setItem(GUEST_NAME_KEY, sanitized);
    return sanitized;
  }
  return getOrCreateGuestUser().nickname;
}
