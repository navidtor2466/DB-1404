import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Star,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Map as MapIcon,
  ChevronRight,
  ChevronLeft,
  Send,
} from 'lucide-react';
import {
  getCityById,
  getCommentsByPostId,
  getPlaceById,
  getPostById,
  getUsers,
} from '@/lib/api';
import type { City, Comment, Place, Post, User } from '@/types/database';

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const currentUserId = 'user-1';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [newComment, setNewComment] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [place, setPlace] = useState<Place | undefined>();
  const [city, setCity] = useState<City | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentImageIndex(0);
    setUserRating(0);
    setNewComment('');
  }, [postId]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!postId) {
          if (isMounted) setPost(null);
          return;
        }

        const postData = await getPostById(postId);
        if (!postData) {
          if (isMounted) setPost(null);
          return;
        }

        const [usersData, commentsData, placeData, cityData] = await Promise.all([
          getUsers(),
          getCommentsByPostId(postData.post_id),
          postData.place_id ? getPlaceById(postData.place_id) : Promise.resolve(undefined),
          postData.city_id ? getCityById(postData.city_id) : Promise.resolve(undefined),
        ]);

        if (!isMounted) return;
        setPost(postData);
        setUsers(usersData);
        setComments(commentsData);
        setPlace(placeData);
        setCity(cityData);
      } catch (error) {
        console.error('Error loading post data:', error);
        if (isMounted) setLoadError('Unable to load post.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    setIsLoading(true);
    setLoadError(null);
    loadData();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const usersById = useMemo(() => new Map(users.map((user) => [user.user_id, user])), [users]);
  const user = post ? usersById.get(post.user_id) : undefined;
  const currentUser = usersById.get(currentUserId);
  const fallbackPostImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80';
  const postImages = post?.images?.length ? post.images : [fallbackPostImage];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading post...
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">پست یافت نشد</p>
        <Button asChild className="mt-4">
          <Link to="/app/posts">بازگشت به لیست تجربه‌ها</Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % postImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + postImages.length) % postImages.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/app/posts" className="hover:text-primary">تجربه‌ها</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      {loadError && (
        <p className="text-sm text-destructive">{loadError}</p>
      )}

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Post Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src={postImages[currentImageIndex]} 
                alt={post.title}
                className="w-full h-80 sm:h-96 object-cover"
              />
              
              {postImages.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {postImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}

              <Badge 
                variant={post.experience_type === 'visited' ? 'default' : 'secondary'}
                className="absolute top-4 right-4"
              >
                {post.experience_type === 'visited' ? 'بازدید شده' : 'رویایی'}
              </Badge>
            </div>

            {/* Thumbnail Strip */}
            {postImages.length > 1 && (
              <div className="p-2 flex gap-2 overflow-x-auto">
                {postImages.map((img, index) => (
                  <button
                    key={index}
                    className={`shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`تصویر ${index + 1}`}
                      className="w-16 h-12 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Post Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {place?.name || city?.name}
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.created_at)}
                  </CardDescription>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-7 whitespace-pre-wrap">
                {post.content}
              </p>
            </CardContent>
          </Card>

          {/* Rating Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">امتیاز شما</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-1 hover:scale-110 transition-transform"
                      onClick={() => setUserRating(star)}
                    >
                      <Star 
                        className={`h-8 w-8 ${
                          star <= userRating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {userRating > 0 ? `امتیاز شما: ${userRating}` : 'امتیاز دهید'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                نظرات ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Comment */}
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={currentUser?.profile_image} />
                  <AvatarFallback>{currentUser?.name?.charAt(0) ?? '?'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea 
                    placeholder="نظر خود را بنویسید..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 ml-2" />
                    ارسال نظر
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Comments List */}
              {comments.map((comment) => {
                const commentUser = usersById.get(comment.user_id);
                return (
                  <div key={comment.comment_id} className="flex gap-4">
                    <Link to={`/app/profile/${comment.user_id}`}>
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={commentUser?.profile_image} />
                        <AvatarFallback>{commentUser?.name?.charAt(0) ?? '?'}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link 
                          to={`/app/profile/${comment.user_id}`}
                          className="font-medium hover:text-primary"
                        >
                          {commentUser?.name}
                        </Link>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                );
              })}

              {comments.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  اولین نظر را ثبت کنید
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">نویسنده</CardTitle>
            </CardHeader>
            <CardContent>
              <Link 
                to={`/app/profile/${user?.user_id}`}
                className="flex items-center gap-4 hover:opacity-80"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user?.profile_image} />
                  <AvatarFallback>{user?.name?.charAt(0) ?? '?'}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.name}</h4>
                  <p className="text-sm text-muted-foreground">@{user?.username}</p>
                </div>
              </Link>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to={`/app/profile/${user?.user_id}`}>
                  مشاهده پروفایل
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">آمار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">میانگین امتیاز</span>
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                  <Star className="h-4 w-4 fill-current" />
                  {post.avg_rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">تعداد رای</span>
                <span className="font-medium">{post.rating_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">تعداد نظرات</span>
                <span className="font-medium">{comments.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          {(place || city) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">موقعیت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {place && (
                  <div>
                    <h4 className="font-medium">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.description}</p>
                  </div>
                )}
                {city && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {city.name}، {city.province}
                  </div>
                )}
                {place?.features && place.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {place.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
                {place?.map_url && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={place.map_url} target="_blank" rel="noopener noreferrer">
                      <MapIcon className="h-4 w-4 ml-2" />
                      نمایش در نقشه
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
