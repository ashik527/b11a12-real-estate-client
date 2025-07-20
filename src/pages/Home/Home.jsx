import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';

const Home = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  // Fetch latest verified properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['verifiedProperties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/properties/verified');
      return res.data;
    }
  });

  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ['homepageTestimonials'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews');
      return res.data;
    },
    refetchOnWindowFocus: true, // so it updates after deleting
  });

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1000}
          className="h-[80vh] max-h-[800px] min-h-[500px] w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-transparent"
              style={{ backgroundImage: 'url(https://i.ibb.co/fYVC1F6R/pexels-curtis-adams-1694007-3935344.jpg)' }}
            >
              <div className="container mx-auto px-6 relative z-10 text-left max-w-2xl ml-10 lg:ml-20">
                <span className="text-lg font-medium text-amber-400 mb-2 block">LUXURY LIVING</span>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Discover Your <span className="text-amber-400">Perfect</span> Home
                </h1>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  Explore our exclusive collection of premium properties tailored to your lifestyle.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-transparent"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80)' }}
            >
              <div className="container mx-auto px-6 relative z-10 text-left max-w-2xl ml-10 lg:ml-20">
                <span className="text-lg font-medium text-emerald-300 mb-2 block">MODERN DESIGN</span>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Contemporary <span className="text-emerald-300">Spaces</span> for You
                </h1>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  Find modern architectural masterpieces that combine comfort and style.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-transparent"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1470&q=80)' }}
            >
              <div className="container mx-auto px-6 relative z-10 text-left max-w-2xl ml-10 lg:ml-20">
                <span className="text-lg font-medium text-blue-300 mb-2 block">PRIME LOCATIONS</span>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  In The <span className="text-blue-300">Heart</span> of The City
                </h1>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  Premium properties in the most sought-after neighborhoods.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Custom Navigation Arrows */}
          <div ref={prevRef} className="swiper-button-prev !text-white !w-14 !h-14 !left-10 after:!text-3xl hover:!scale-110 !transition-all"></div>
          <div ref={nextRef} className="swiper-button-next !text-white !w-14 !h-14 !right-10 after:!text-3xl hover:!scale-110 !transition-all"></div>
        </Swiper>
      </section>

      {/* Latest Verified Properties */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Latest Verified Listings</h2>

          {isLoading ? (
            <p className="text-center">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="text-center text-gray-500">No verified properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((p) => (
                <div key={p._id} className="card bg-white shadow-xl">
                  <figure><img src={p.image} alt={p.title} className="h-48 w-full object-cover" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{p.title}</h2>
                    <p>{p.location}</p>
                    <p className="text-primary font-semibold">
                      ${p.priceMin} - ${p.priceMax}
                    </p>
                    <div className="card-actions justify-end">
                      <Link to={`/properties/${p._id}`} className="btn btn-sm btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>

          {loadingReviews ? (
            <p>Loading testimonials...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review, idx) => (
                <div key={idx} className="card bg-green-200 shadow-lg p-6">
                  <figure className="mb-4">
                    <img
                      src={'https://i.ibb.co/JRqd69RP/nathan-da-silva-k-r-Kfq-Sm4-L4-unsplash.jpg'}
                      alt="User"
                      className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                  </figure>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{review.userEmail}</h3>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                    <p className="text-sm text-primary">Property: {review.propertyTitle}</p>
                    <div className="rating rating-sm flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${review._id}`}
                          className="mask mask-star-2 bg-orange-600"
                          checked={review.rating === star}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

<section className="py-16 bg-green-100">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div className="p-6 border rounded-lg hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-primary">Verified Listings</h3>
        <p>We manually verify each property to ensure you get accurate and up-to-date information every time.</p>
      </div>
      <div className="p-6 border rounded-lg hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-primary">Top Rated Agents</h3>
        <p>Our trusted agents are rated by users and committed to helping you find your dream home.</p>
      </div>
      <div className="p-6 border rounded-lg hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2 text-primary">Fast & Easy Booking</h3>
        <p>Book property visits or submit offers directly from our platform with a seamless experience.</p>
      </div>
    </div>
  </div>
</section>

{/* Success section */}
<section className="py-16 bg-base-100">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">Our Journey So Far</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-green-100 p-6 rounded-lg shadow">
        <h3 className="text-4xl font-bold text-primary">
          <CountUp end={500} duration={3} />+
        </h3>
        <p className="mt-2 text-gray-600">Verified Properties</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg shadow">
        <h3 className="text-4xl font-bold text-primary">
          <CountUp end={300} duration={3} />+
        </h3>
        <p className="mt-2 text-gray-600">Happy Clients</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg shadow">
        <h3 className="text-4xl font-bold text-primary">
          <CountUp end={100} duration={3} />+
        </h3>
        <p className="mt-2 text-gray-600">Top Rated Agents</p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
