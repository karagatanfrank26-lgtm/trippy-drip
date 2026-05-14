import React from 'react';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8 text-center">
          ABOUT US
        </h1>

        {/* Main Story */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">The Trippy Journey</h2>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              High Trippy Mind's Drip was born from a simple dream: to create streetwear that doesn't just
              look good, but makes you <span className="text-pink-500 font-bold">feel</span> something.
            </p>

            <p>
              In the heart of Quezon City, a group of creative minds came together with one vision—
              to merge the psychedelic energy of streetwear culture with premium quality and design
              that speaks to the modern tripper.
            </p>

            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 my-6">
              "Mind Melt Guaranteed™"
            </p>

            <p>
              That's not just our slogan—it's our promise. Every piece in our collection is designed to
              turn heads, spark conversations, and represent the vibrant, creative spirit of those who
              dare to be different.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-6">
            <h3 className="text-2xl font-bold text-pink-500 mb-3">🎨 Creativity</h3>
            <p className="text-gray-300">
              We push boundaries and challenge the status quo with bold, innovative designs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-6">
            <h3 className="text-2xl font-bold text-pink-500 mb-3">⭐ Quality</h3>
            <p className="text-gray-300">
              Premium materials and meticulous craftsmanship in every piece.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-6">
            <h3 className="text-2xl font-bold text-pink-500 mb-3">🌟 Community</h3>
            <p className="text-gray-300">
              We celebrate individuality and build a community of like-minded trippers.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Our Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-4xl font-black text-pink-500">10K+</div>
              <p className="text-gray-400">Happy Trippers</p>
            </div>
            <div>
              <div className="text-4xl font-black text-pink-500">50+</div>
              <p className="text-gray-400">Designs</p>
            </div>
            <div>
              <div className="text-4xl font-black text-pink-500">100%</div>
              <p className="text-gray-400">Premium Quality</p>
            </div>
            <div>
              <div className="text-4xl font-black text-pink-500">24/7</div>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
