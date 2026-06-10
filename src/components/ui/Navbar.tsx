import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMovieStore } from '../../store/movieStore';

const searchSchema = z.object({
  query: z.string().trim().min(1, 'Search query cannot be empty'),
});
type SearchFormData = z.infer<typeof searchSchema>;
const Navbar = () => {
  const navigate = useNavigate();
  const setSearchQuery = useMovieStore((state) => state.setSearchQuery);
  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: '' },
  });
  const onSubmit = (data: SearchFormData) => {
    setSearchQuery(data.query);
    navigate('/search');
  };
  const handleResetHome = () => {
    setSearchQuery('');
    reset();
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-linear-to-b from-black/90 to-transparent backdrop-blur-sm border border-b border-white/5">
      <div className="flex item-center gap-10">
        <Link
          to="/"
          onClick={handleResetHome}
          className="flex items-center text-2xl font-black tracking-tighter text-white group"
        >
          <span className="bg-red-600 text-white px-2 py-0.5 rounded font-extrabold text-lg mr-1.5 transition transform group-hover:scale-105">
            Movie
          </span>
        </Link>
        <div className="flex gap-6 text-sm font-semibold tracking-wide text-gray-300">
          <Link
            to="/"
            onClick={handleResetHome}
            className="hover:text-white hover:underline underline-offset-4 decoration-2 transition"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:text-white hover:underline underline-offset-4 decoration-red-600 decoration-2 transition"
          >
            Favorites
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-48 sm:w-64 group">
        <input
          {...register('query')}
          type="text"
          placeholder="Search Movie"
          className="w-full bg-gray-950 border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:bg-black/90 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 hover:text-white transition-colors"
          aria-label="Submit Search"
        >
          <Search size={16} />
        </button>
      </form>
    </nav>
  );
};
export default Navbar;
