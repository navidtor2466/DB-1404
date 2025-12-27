// Mock Data for Hamsafar Mirza - Based on Phase 2 Logical Design
import {
  User,
  Profile,
  City,
  Place,
  Post,
  Comment,
  CompanionRequest,
  CompanionMatch,
  Follow,
  Rating,
  RegularUser,
  Moderator,
  Admin,
} from '@/types/database';

// ==================== USERS ====================
export const users: User[] = [
  {
    user_id: 'user-1',
    name: 'علی احمدی',
    username: 'ali_ahmadi',
    email: 'ali@example.com',
    phone: '09121234567',
    password_hash: 'hashed_password_1',
    profile_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    created_at: '2024-01-15T10:30:00Z',
    user_type: 'regular',
  },
  {
    user_id: 'user-2',
    name: 'مریم رضایی',
    username: 'maryam_rezaei',
    email: 'maryam@example.com',
    phone: '09129876543',
    password_hash: 'hashed_password_2',
    profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    created_at: '2024-01-20T14:00:00Z',
    user_type: 'regular',
  },
  {
    user_id: 'user-3',
    name: 'محمد حسینی',
    username: 'mohammad_hoseini',
    email: 'mohammad@example.com',
    phone: '09123456789',
    password_hash: 'hashed_password_3',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    created_at: '2024-02-01T09:00:00Z',
    user_type: 'moderator',
  },
  {
    user_id: 'user-4',
    name: 'سارا کریمی',
    username: 'sara_karimi',
    email: 'sara@example.com',
    password_hash: 'hashed_password_4',
    profile_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    created_at: '2024-02-10T16:30:00Z',
    user_type: 'admin',
  },
  {
    user_id: 'user-5',
    name: 'رضا محمدی',
    username: 'reza_mohammadi',
    email: 'reza@example.com',
    password_hash: 'hashed_password_5',
    profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    created_at: '2024-02-15T11:00:00Z',
    user_type: 'regular',
  },
];

// ==================== SUBTYPE TABLES ====================
export const regularUsers: RegularUser[] = [
  {
    user_id: 'user-1',
    travel_preferences: ['nature', 'hiking', 'photography'],
    experience_level: 'intermediate',
  },
  {
    user_id: 'user-2',
    travel_preferences: ['history', 'culture', 'food'],
    experience_level: 'advanced',
  },
  {
    user_id: 'user-5',
    travel_preferences: ['adventure', 'camping', 'wildlife'],
    experience_level: 'beginner',
  },
];

export const moderators: Moderator[] = [
  {
    user_id: 'user-3',
    assigned_regions: ['تهران', 'اصفهان', 'شیراز'],
    approval_count: 156,
  },
];

export const admins: Admin[] = [
  {
    user_id: 'user-4',
    access_level: 5,
    last_admin_action: '2024-03-01T10:00:00Z',
  },
];

// ==================== PROFILES ====================
export const profiles: Profile[] = [
  {
    profile_id: 'profile-1',
    user_id: 'user-1',
    bio: 'عاشق سفر و طبیعت گردی هستم. هر سال چندین سفر به نقاط مختلف ایران و جهان دارم.',
    cover_image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    interests: ['کوهنوردی', 'عکاسی', 'طبیعت گردی', 'کمپینگ'],
    followers_count: 245,
    following_count: 128,
  },
  {
    profile_id: 'profile-2',
    user_id: 'user-2',
    bio: 'راهنمای گردشگری و علاقه‌مند به تاریخ و فرهنگ ایران. در حال نوشتن کتاب سفرنامه.',
    cover_image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    interests: ['تاریخ', 'فرهنگ', 'غذای محلی', 'معماری'],
    followers_count: 892,
    following_count: 256,
  },
  {
    profile_id: 'profile-3',
    user_id: 'user-3',
    bio: 'مدیر محتوا و نظارت بر پست‌های منطقه مرکزی ایران.',
    cover_image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    interests: ['مدیریت', 'گردشگری', 'نویسندگی'],
    followers_count: 156,
    following_count: 89,
  },
  {
    profile_id: 'profile-4',
    user_id: 'user-4',
    bio: 'مدیر سیستم همسفر میرزا.',
    cover_image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    interests: ['توسعه', 'مدیریت', 'سفر'],
    followers_count: 78,
    following_count: 45,
  },
  {
    profile_id: 'profile-5',
    user_id: 'user-5',
    bio: 'تازه شروع به سفر کردم و به دنبال همسفر هستم!',
    cover_image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
    interests: ['ماجراجویی', 'کمپینگ', 'حیات وحش'],
    followers_count: 34,
    following_count: 112,
  },
];

// ==================== CITIES ====================
export const cities: City[] = [
  {
    city_id: 'city-1',
    name: 'اصفهان',
    description: 'نصف جهان، شهر هنر و معماری ایران با میدان نقش جهان',
    province: 'اصفهان',
    country: 'ایران',
    latitude: 32.6546,
    longitude: 51.6680,
  },
  {
    city_id: 'city-2',
    name: 'شیراز',
    description: 'شهر شعر و گل، زادگاه حافظ و سعدی',
    province: 'فارس',
    country: 'ایران',
    latitude: 29.5918,
    longitude: 52.5836,
  },
  {
    city_id: 'city-3',
    name: 'یزد',
    description: 'شهر بادگیرها و اولین شهر خشتی جهان',
    province: 'یزد',
    country: 'ایران',
    latitude: 31.8974,
    longitude: 54.3569,
  },
  {
    city_id: 'city-4',
    name: 'کاشان',
    description: 'شهر گلاب و خانه‌های تاریخی زیبا',
    province: 'اصفهان',
    country: 'ایران',
    latitude: 33.9850,
    longitude: 51.4100,
  },
  {
    city_id: 'city-5',
    name: 'تبریز',
    description: 'شهر اولین‌ها و بازار تاریخی بزرگ',
    province: 'آذربایجان شرقی',
    country: 'ایران',
    latitude: 38.0800,
    longitude: 46.2919,
  },
];

// ==================== PLACES ====================
export const places: Place[] = [
  {
    place_id: 'place-1',
    city_id: 'city-1',
    name: 'میدان نقش جهان',
    description: 'یکی از بزرگترین میادین تاریخی جهان و میراث جهانی یونسکو',
    latitude: 32.6572,
    longitude: 51.6780,
    map_url: 'https://maps.google.com/?q=32.6572,51.6780',
    features: ['میراث یونسکو', 'بازار سنتی', 'مسجد شیخ لطف‌الله', 'کاخ عالی قاپو'],
    images: [
      'https://images.unsplash.com/photo-1564668662856-d4c59c83b7b3?w=800&q=80',
      'https://images.unsplash.com/photo-1589308454676-22c0250c8c9e?w=800&q=80',
    ],
  },
  {
    place_id: 'place-2',
    city_id: 'city-1',
    name: 'سی و سه پل',
    description: 'پل تاریخی و نماد شهر اصفهان بر روی زاینده‌رود',
    latitude: 32.6431,
    longitude: 51.6611,
    map_url: 'https://maps.google.com/?q=32.6431,51.6611',
    features: ['پل تاریخی', 'چایخانه', 'منظره شبانه', 'پیاده‌روی'],
    images: [
      'https://images.unsplash.com/photo-1565977422167-e68f8b0ea9f9?w=800&q=80',
    ],
  },
  {
    place_id: 'place-3',
    city_id: 'city-2',
    name: 'تخت جمشید',
    description: 'کاخ هخامنشیان و یکی از مهم‌ترین آثار باستانی جهان',
    latitude: 29.9349,
    longitude: 52.8918,
    map_url: 'https://maps.google.com/?q=29.9349,52.8918',
    features: ['میراث یونسکو', 'باستان‌شناسی', 'معماری هخامنشی', 'موزه'],
    images: [
      'https://images.unsplash.com/photo-1573061218917-5a2b70f9b0c9?w=800&q=80',
    ],
  },
  {
    place_id: 'place-4',
    city_id: 'city-2',
    name: 'حافظیه',
    description: 'آرامگاه حافظ شیرازی، شاعر بزرگ ایران',
    latitude: 29.6202,
    longitude: 52.5481,
    map_url: 'https://maps.google.com/?q=29.6202,52.5481',
    features: ['آرامگاه', 'باغ', 'فال حافظ', 'کافه سنتی'],
    images: [
      'https://images.unsplash.com/photo-1594735157638-09e9fa7a3bac?w=800&q=80',
    ],
  },
  {
    place_id: 'place-5',
    city_id: 'city-3',
    name: 'مسجد جامع یزد',
    description: 'مسجدی با بلندترین مناره‌های ایران',
    latitude: 31.8979,
    longitude: 54.3556,
    map_url: 'https://maps.google.com/?q=31.8979,54.3556',
    features: ['معماری اسلامی', 'کاشیکاری', 'مناره بلند', 'محراب'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
  },
  {
    place_id: 'place-6',
    city_id: 'city-4',
    name: 'خانه طباطبایی‌ها',
    description: 'شاهکار معماری قاجاری با حوض و باغچه زیبا',
    latitude: 33.9830,
    longitude: 51.4170,
    map_url: 'https://maps.google.com/?q=33.9830,51.4170',
    features: ['خانه تاریخی', 'معماری قاجار', 'عکاسی', 'بادگیر'],
    images: [
      'https://images.unsplash.com/photo-1579033485043-25a0c86e1ae0?w=800&q=80',
    ],
  },
];

// ==================== POSTS ====================
export const posts: Post[] = [
  {
    post_id: 'post-1',
    user_id: 'user-1',
    place_id: 'place-1',
    city_id: 'city-1',
    title: 'یک روز فوق‌العاده در نقش جهان',
    content: 'امروز به میدان نقش جهان رفتم و واقعاً شگفت‌زده شدم! معماری فوق‌العاده، بازار سنتی پر از صنایع دستی و کاخ عالی قاپو که منظره‌ای بی‌نظیر از کل میدان دارد. پیشنهاد می‌کنم حتماً غروب آفتاب را از بالای عالی قاپو تماشا کنید.',
    experience_type: 'visited',
    approval_status: 'approved',
    created_at: '2024-02-20T15:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1564668662856-d4c59c83b7b3?w=800&q=80',
      'https://images.unsplash.com/photo-1589308454676-22c0250c8c9e?w=800&q=80',
    ],
    avg_rating: 4.7,
    rating_count: 23,
  },
  {
    post_id: 'post-2',
    user_id: 'user-2',
    place_id: 'place-3',
    city_id: 'city-2',
    title: 'سفر به گذشته در تخت جمشید',
    content: 'تخت جمشید مکانی است که هر ایرانی باید حداقل یکبار ببیند. عظمت و شکوه این بنا واقعاً خیره‌کننده است. توصیه می‌کنم صبح زود بروید تا هم خلوت‌تر باشد و هم نور مناسب‌تری برای عکاسی داشته باشید.',
    experience_type: 'visited',
    approval_status: 'approved',
    created_at: '2024-02-18T10:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1573061218917-5a2b70f9b0c9?w=800&q=80',
    ],
    avg_rating: 4.9,
    rating_count: 45,
  },
  {
    post_id: 'post-3',
    user_id: 'user-5',
    place_id: 'place-5',
    city_id: 'city-3',
    title: 'رویای سفر به یزد',
    content: 'خیلی دوست دارم یزد را ببینم! شنیده‌ام که شهر بادگیرها و خانه‌های خشتی منحصر به فردی دارد. امیدوارم به زودی بتوانم این سفر را انجام دهم و مسجد جامع یزد را از نزدیک ببینم.',
    experience_type: 'imagined',
    approval_status: 'approved',
    created_at: '2024-02-25T09:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
    avg_rating: 4.2,
    rating_count: 12,
  },
  {
    post_id: 'post-4',
    user_id: 'user-1',
    place_id: 'place-4',
    city_id: 'city-2',
    title: 'شب‌های حافظیه',
    content: 'نشستن کنار آرامگاه حافظ در یک شب بهاری، تجربه‌ای معنوی بود. فال گرفتم و شعری خواندم که انگار مخصوص من نوشته شده بود. اگر به شیراز رفتید، شب‌ها را از دست ندهید!',
    experience_type: 'visited',
    approval_status: 'approved',
    created_at: '2024-03-01T20:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1594735157638-09e9fa7a3bac?w=800&q=80',
    ],
    avg_rating: 4.8,
    rating_count: 31,
  },
  {
    post_id: 'post-5',
    user_id: 'user-2',
    place_id: 'place-6',
    city_id: 'city-4',
    title: 'جادوی خانه طباطبایی‌ها',
    content: 'خانه طباطبایی‌ها یک شاهکار معماری است! حوض وسط حیاط، آینه‌کاری‌های زیبا و بادگیرهایی که هنوز هم کار می‌کنند. هر گوشه این خانه یک کادر عکس است. حتماً دوربین ببرید!',
    experience_type: 'visited',
    approval_status: 'approved',
    created_at: '2024-03-05T11:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1579033485043-25a0c86e1ae0?w=800&q=80',
    ],
    avg_rating: 4.6,
    rating_count: 18,
  },
];

// ==================== COMMENTS ====================
export const comments: Comment[] = [
  {
    comment_id: 'comment-1',
    post_id: 'post-1',
    user_id: 'user-2',
    content: 'عکس‌های فوق‌العاده‌ای! من هم می‌خواهم برم اصفهان.',
    created_at: '2024-02-20T18:00:00Z',
  },
  {
    comment_id: 'comment-2',
    post_id: 'post-1',
    user_id: 'user-5',
    content: 'چقدر قشنگ! کدوم هتل رو پیشنهاد می‌کنید؟',
    created_at: '2024-02-21T09:30:00Z',
  },
  {
    comment_id: 'comment-3',
    post_id: 'post-2',
    user_id: 'user-1',
    content: 'واقعاً جای شگفت‌انگیزی است. من سال گذشته رفتم.',
    created_at: '2024-02-19T14:00:00Z',
  },
  {
    comment_id: 'comment-4',
    post_id: 'post-3',
    user_id: 'user-2',
    content: 'یزد فوق‌العاده‌ست! حتماً برو و شیرینی‌های محلی رو امتحان کن.',
    created_at: '2024-02-25T15:00:00Z',
  },
  {
    comment_id: 'comment-5',
    post_id: 'post-4',
    user_id: 'user-3',
    content: 'توصیف بسیار زیبایی بود. واقعاً احساس کردم اونجام.',
    created_at: '2024-03-02T10:00:00Z',
  },
];

// ==================== RATINGS ====================
export const ratings: Rating[] = [
  { user_id: 'user-2', post_id: 'post-1', score: 5, created_at: '2024-02-20T18:30:00Z' },
  { user_id: 'user-3', post_id: 'post-1', score: 4, created_at: '2024-02-21T10:00:00Z' },
  { user_id: 'user-5', post_id: 'post-1', score: 5, created_at: '2024-02-21T12:00:00Z' },
  { user_id: 'user-1', post_id: 'post-2', score: 5, created_at: '2024-02-19T14:30:00Z' },
  { user_id: 'user-3', post_id: 'post-2', score: 5, created_at: '2024-02-19T16:00:00Z' },
  { user_id: 'user-5', post_id: 'post-2', score: 5, created_at: '2024-02-20T09:00:00Z' },
  { user_id: 'user-1', post_id: 'post-3', score: 4, created_at: '2024-02-25T11:00:00Z' },
  { user_id: 'user-2', post_id: 'post-4', score: 5, created_at: '2024-03-02T12:00:00Z' },
  { user_id: 'user-3', post_id: 'post-4', score: 5, created_at: '2024-03-02T15:00:00Z' },
  { user_id: 'user-1', post_id: 'post-5', score: 5, created_at: '2024-03-05T14:00:00Z' },
];

// ==================== FOLLOWS ====================
export const follows: Follow[] = [
  { follower_id: 'user-1', following_id: 'user-2', created_at: '2024-01-25T10:00:00Z' },
  { follower_id: 'user-2', following_id: 'user-1', created_at: '2024-01-26T14:00:00Z' },
  { follower_id: 'user-5', following_id: 'user-1', created_at: '2024-02-16T09:00:00Z' },
  { follower_id: 'user-5', following_id: 'user-2', created_at: '2024-02-16T09:30:00Z' },
  { follower_id: 'user-3', following_id: 'user-1', created_at: '2024-02-05T11:00:00Z' },
  { follower_id: 'user-3', following_id: 'user-2', created_at: '2024-02-05T11:30:00Z' },
];

// ==================== COMPANION REQUESTS ====================
export const companionRequests: CompanionRequest[] = [
  {
    request_id: 'request-1',
    user_id: 'user-5',
    destination_place_id: 'place-1',
    destination_city_id: 'city-1',
    travel_date: '2024-04-15',
    description: 'سلام! به دنبال همسفر برای سفر به اصفهان هستم. برنامه‌ریزی کردم ۳ روز بمونم و میدان نقش جهان، پل‌ها و جلفا رو ببینم.',
    status: 'active',
    created_at: '2024-03-10T08:00:00Z',
    conditions: ['غیرسیگاری', 'علاقه‌مند به عکاسی', 'سحرخیز'],
  },
  {
    request_id: 'request-2',
    user_id: 'user-1',
    destination_city_id: 'city-3',
    travel_date: '2024-05-01',
    description: 'برای عید می‌خوام برم یزد. کسی هست بیاد؟ میخوام ۴ روز بمونم و همه جاهای دیدنی رو ببینم.',
    status: 'active',
    created_at: '2024-03-08T14:00:00Z',
    conditions: ['انعطاف‌پذیر', 'علاقه‌مند به تاریخ'],
  },
  {
    request_id: 'request-3',
    user_id: 'user-2',
    destination_place_id: 'place-3',
    destination_city_id: 'city-2',
    travel_date: '2024-03-20',
    description: 'سفر تحقیقاتی به تخت جمشید برای نوشتن کتاب. کسی علاقه‌مند به تاریخ هست همراه بشه؟',
    status: 'completed',
    created_at: '2024-02-28T10:00:00Z',
    conditions: ['علاقه‌مند به باستان‌شناسی', 'صبور'],
  },
];

// ==================== COMPANION MATCHES ====================
export const companionMatches: CompanionMatch[] = [
  {
    match_id: 'match-1',
    request_id: 'request-1',
    companion_user_id: 'user-1',
    status: 'pending',
    message: 'سلام! من هم می‌خوام برم اصفهان. عکاسی هم دوست دارم. میتونم بیام؟',
    created_at: '2024-03-10T12:00:00Z',
  },
  {
    match_id: 'match-2',
    request_id: 'request-1',
    companion_user_id: 'user-2',
    status: 'accepted',
    message: 'من قبلاً اصفهان رفتم و می‌تونم راهنمایی کنم!',
    created_at: '2024-03-10T14:00:00Z',
  },
  {
    match_id: 'match-3',
    request_id: 'request-2',
    companion_user_id: 'user-5',
    status: 'pending',
    message: 'یزد توی لیست آرزوهامه! با کمال میل میام.',
    created_at: '2024-03-09T09:00:00Z',
  },
  {
    match_id: 'match-4',
    request_id: 'request-3',
    companion_user_id: 'user-1',
    status: 'accepted',
    message: 'تاریخ رو خیلی دوست دارم. حتماً میام!',
    created_at: '2024-03-01T15:00:00Z',
  },
];

// Helper functions to simulate database queries
export const getUserById = (id: string) => users.find(u => u.user_id === id);
export const getProfileByUserId = (userId: string) => profiles.find(p => p.user_id === userId);
export const getCityById = (id: string) => cities.find(c => c.city_id === id);
export const getPlaceById = (id: string) => places.find(p => p.place_id === id);
export const getPostById = (id: string) => posts.find(p => p.post_id === id);
export const getCommentsByPostId = (postId: string) => comments.filter(c => c.post_id === postId);
export const getPostsByUserId = (userId: string) => posts.filter(p => p.user_id === userId);
export const getRequestsByUserId = (userId: string) => companionRequests.filter(r => r.user_id === userId);
export const getMatchesByRequestId = (requestId: string) => companionMatches.filter(m => m.request_id === requestId);
export const getFollowerCount = (userId: string) => follows.filter(f => f.following_id === userId).length;
export const getFollowingCount = (userId: string) => follows.filter(f => f.follower_id === userId).length;
