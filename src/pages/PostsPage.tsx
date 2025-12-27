import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Star, 
  Search,
  Plus,
  MessageCircle,
  Calendar,
  Eye
} from 'lucide-react';
import { 
  posts, 
  cities,
  getUserById,
  getPlaceById,
  getCityById,
  getCommentsByPostId
} from '@/data/mockData';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [experienceType, setExperienceType] = useState<string>('all');

  // Enrich posts with related data
  const enrichedPosts = posts.map(post => ({
    ...post,
    user: getUserById(post.user_id),
    place: post.place_id ? getPlaceById(post.place_id) : undefined,
    city: post.city_id ? getCityById(post.city_id) : undefined,
    comments: getCommentsByPostId(post.post_id),
  }));

  // Filter posts
  const filteredPosts = enrichedPosts.filter(post => {
    const matchesSearch = post.title.includes(searchQuery) || 
                          post.content.includes(searchQuery) ||
                          post.place?.name.includes(searchQuery) ||
                          post.city?.name.includes(searchQuery);
    const matchesCity = selectedCity === 'all' || post.city_id === selectedCity;
    const matchesType = experienceType === 'all' || post.experience_type === experienceType;
    
    return matchesSearch && matchesCity && matchesType;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">تجربه‌های سفر</h1>
          <p className="text-muted-foreground">تجربیات سفر کاربران را مرور کنید</p>
        </div>
        <Button asChild>
          <Link to="/app/posts/new">
            <Plus className="h-4 w-4 ml-2" />
            ثبت تجربه جدید
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو در تجربه‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب شهر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه شهرها</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city.city_id} value={city.city_id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={experienceType} onValueChange={setExperienceType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع تجربه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="visited">بازدید شده</SelectItem>
                <SelectItem value="imagined">رویایی</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">نمایش کارتی</TabsTrigger>
          <TabsTrigger value="list">نمایش لیستی</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.post_id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <Link to={`/app/posts/${post.post_id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.images[0]} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge 
                      variant={post.experience_type === 'visited' ? 'default' : 'secondary'}
                      className="absolute top-3 right-3"
                    >
                      {post.experience_type === 'visited' ? 'بازدید شده' : 'رویایی'}
                    </Badge>
                    {post.images.length > 1 && (
                      <Badge variant="outline" className="absolute top-3 left-3 bg-black/50 text-white border-0">
                        +{post.images.length - 1}
                      </Badge>
                    )}
                  </div>
                </Link>
                <CardHeader className="pb-2">
                  <Link to={`/app/posts/${post.post_id}`}>
                    <CardTitle className="text-lg line-clamp-1 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {post.place?.name || post.city?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link to={`/app/profile/${post.user_id}`} className="flex items-center gap-2 hover:opacity-80">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.user?.profile_image} />
                        <AvatarFallback>{post.user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.user?.name}</span>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        {post.avg_rating.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <Card key={post.post_id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Link to={`/app/posts/${post.post_id}`} className="shrink-0">
                      <img 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <Link to={`/app/posts/${post.post_id}`}>
                            <h3 className="font-bold text-lg hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {post.place?.name || post.city?.name}
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.created_at)}
                          </div>
                        </div>
                        <Badge variant={post.experience_type === 'visited' ? 'default' : 'secondary'}>
                          {post.experience_type === 'visited' ? 'بازدید شده' : 'رویایی'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link to={`/app/profile/${post.user_id}`} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.user?.profile_image} />
                            <AvatarFallback>{post.user?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{post.user?.name}</span>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            {post.avg_rating.toFixed(1)} ({post.rating_count})
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments.length}
                          </span>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/app/posts/${post.post_id}`}>
                              <Eye className="h-4 w-4 ml-1" />
                              مشاهده
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="py-12 text-center">
          <CardContent>
            <p className="text-muted-foreground mb-4">هیچ تجربه‌ای یافت نشد</p>
            <Button asChild>
              <Link to="/app/posts/new">اولین تجربه را ثبت کنید</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
