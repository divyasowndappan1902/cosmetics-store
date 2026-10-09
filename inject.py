import re

def insert_before(filepath, search_str, insert_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if search_str in content:
        content = content.replace(search_str, insert_str + '\n' + search_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully modified {filepath}")
    else:
        print(f"Could not find '{search_str}' in {filepath}")

# ABOUT PAGE HTML
about_html = """
  <!-- Inside Our Formulation Lab Section -->
  <section class="w-full bg-[#FDF9F2] py-24 md:py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center md:text-left">
        <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#38251E] leading-tight tracking-tight mb-4">
          Inside Our <span class="text-[#D0B286]">Formulation Lab</span>
        </h2>
        <p class="font-serif text-[#38251E]/80 text-[1.15rem] max-w-2xl">
          A glimpse into how we transform raw botanicals into the products you love.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <!-- Left: Large Image -->
        <div class="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[700px] formulation-img-wrapper">
          <img src="assets/opt_26cc99e0.webp" alt="Formulation Lab" class="w-full h-full object-cover transform transition-transform duration-[1.5s] hover:scale-105 formulation-img" />
          <div class="absolute inset-0 bg-[#38251E]/10 z-10 pointer-events-none"></div>
        </div>
        
        <!-- Right: Process Steps -->
        <div class="relative formulation-steps-container py-10">
          <!-- Connecting Line -->
          <div class="absolute left-[27px] top-0 bottom-0 w-[2px] bg-[#E9D1A7] z-0 formulation-line-bg hidden md:block">
             <div class="w-full bg-[#C59A65] origin-top formulation-line-progress h-full scale-y-0"></div>
          </div>
          
          <div class="space-y-12">
            <!-- Step 1 -->
            <div class="relative z-10 flex items-start gap-6 md:gap-8 formulation-step opacity-0 translate-y-10">
              <div class="flex-shrink-0 w-14 h-14 rounded-full bg-[#38251E] border-[4px] border-[#FDF9F2] shadow-md flex items-center justify-center text-[#FDF9F2] font-serif text-xl z-10 relative">
                01
              </div>
              <div class="pt-2">
                <h3 class="font-serif text-2xl text-[#38251E] mb-2">Ingredient Selection</h3>
                <p class="font-serif text-[#38251E]/80 text-[1rem] leading-relaxed">
                  We source only the finest ethical botanicals from trusted organic growers worldwide.
                </p>
              </div>
            </div>
            
            <!-- Step 2 -->
            <div class="relative z-10 flex items-start gap-6 md:gap-8 formulation-step opacity-0 translate-y-10">
              <div class="flex-shrink-0 w-14 h-14 rounded-full bg-[#D0B286] border-[4px] border-[#FDF9F2] shadow-md flex items-center justify-center text-[#38251E] font-serif text-xl z-10 relative">
                02
              </div>
              <div class="pt-2">
                <h3 class="font-serif text-2xl text-[#38251E] mb-2">Formula Development</h3>
                <p class="font-serif text-[#38251E]/80 text-[1rem] leading-relaxed">
                  Our chemists spend months perfecting the balance of efficacy, texture, and stability.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative z-10 flex items-start gap-6 md:gap-8 formulation-step opacity-0 translate-y-10">
              <div class="flex-shrink-0 w-14 h-14 rounded-full bg-[#E9D1A7] border-[4px] border-[#FDF9F2] shadow-md flex items-center justify-center text-[#38251E] font-serif text-xl z-10 relative">
                03
              </div>
              <div class="pt-2">
                <h3 class="font-serif text-2xl text-[#38251E] mb-2">Quality Testing</h3>
                <p class="font-serif text-[#38251E]/80 text-[1rem] leading-relaxed">
                  Rigorous testing ensures safety and performance across diverse skin types and conditions.
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="relative z-10 flex items-start gap-6 md:gap-8 formulation-step opacity-0 translate-y-10">
              <div class="flex-shrink-0 w-14 h-14 rounded-full bg-[#38251E] border-[4px] border-[#FDF9F2] shadow-md flex items-center justify-center text-[#FDF9F2] font-serif text-xl z-10 relative">
                04
              </div>
              <div class="pt-2">
                <h3 class="font-serif text-2xl text-[#38251E] mb-2">Final Product</h3>
                <p class="font-serif text-[#38251E]/80 text-[1rem] leading-relaxed">
                  A sophisticated, effective formula ready to elevate your daily beauty ritual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Beauty by Numbers Section -->
  <section class="w-full bg-[#38251E] py-24 md:py-32 relative overflow-hidden border-t border-[#FDF9F2]/10">
    <div class="absolute inset-0 opacity-10 bg-[url('assets/makeup_bg.webp')] bg-cover bg-center pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-[#C59A65]/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#FDF9F2]/10 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#FDF9F2] leading-tight tracking-tight">
          Beauty by <span class="text-[#D0B286] font-light italic">Numbers</span>
        </h2>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <!-- Stat 1 -->
        <div class="text-center stat-card opacity-0 scale-95 border border-[#C59A65]/30 rounded-2xl p-6 md:p-8 bg-[#38251E]/40 backdrop-blur-sm transition-all duration-500 hover:bg-[#38251E]/60 hover:border-[#C59A65]/60 hover:-translate-y-2">
          <div class="font-serif text-3xl md:text-5xl text-[#C59A65] mb-2"><span class="counter" data-target="50000">0</span>+</div>
          <div class="font-serif text-[#FDF9F2]/90 text-[1rem] md:text-[1.1rem]">Happy Customers</div>
        </div>
        <!-- Stat 2 -->
        <div class="text-center stat-card opacity-0 scale-95 border border-[#C59A65]/30 rounded-2xl p-6 md:p-8 bg-[#38251E]/40 backdrop-blur-sm transition-all duration-500 hover:bg-[#38251E]/60 hover:border-[#C59A65]/60 hover:-translate-y-2 delay-100">
          <div class="font-serif text-3xl md:text-5xl text-[#C59A65] mb-2"><span class="counter-float" data-target="4.9">0.0</span>/5</div>
          <div class="font-serif text-[#FDF9F2]/90 text-[1rem] md:text-[1.1rem]">Average Rating</div>
        </div>
        <!-- Stat 3 -->
        <div class="text-center stat-card opacity-0 scale-95 border border-[#C59A65]/30 rounded-2xl p-6 md:p-8 bg-[#38251E]/40 backdrop-blur-sm transition-all duration-500 hover:bg-[#38251E]/60 hover:border-[#C59A65]/60 hover:-translate-y-2 delay-200">
          <div class="font-serif text-3xl md:text-5xl text-[#C59A65] mb-2"><span class="counter" data-target="40">0</span>+</div>
          <div class="font-serif text-[#FDF9F2]/90 text-[1rem] md:text-[1.1rem]">Beauty Products</div>
        </div>
        <!-- Stat 4 -->
        <div class="text-center stat-card opacity-0 scale-95 border border-[#C59A65]/30 rounded-2xl p-6 md:p-8 bg-[#38251E]/40 backdrop-blur-sm transition-all duration-500 hover:bg-[#38251E]/60 hover:border-[#C59A65]/60 hover:-translate-y-2 delay-300">
          <div class="font-serif text-3xl md:text-5xl text-[#C59A65] mb-2"><span class="counter" data-target="10">0</span>+</div>
          <div class="font-serif text-[#FDF9F2]/90 text-[1rem] md:text-[1.1rem]">Years of Expertise</div>
        </div>
      </div>
    </div>
  </section>
"""

# SERVICES PAGE HTML
services_html = """
  <!-- Your Beauty Journey Section -->
  <section class="w-full bg-[#FDF9F2] py-24 md:py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 md:mb-24">
        <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#38251E] leading-tight tracking-tight mb-4">
          Your Beauty <span class="text-[#D0B286] font-light italic">Journey</span>
        </h2>
        <p class="font-serif text-[#38251E]/80 text-[1.15rem] max-w-2xl mx-auto">
          A seamless five-step experience tailored entirely to you and your skin.
        </p>
      </div>

      <div class="relative w-full max-w-5xl mx-auto journey-timeline-container">
        <!-- Vertical Timeline Line -->
        <div class="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#E9D1A7] transform md:-translate-x-1/2 z-0 hidden md:block">
          <div class="w-full bg-[#C59A65] origin-top journey-line-progress h-full scale-y-0"></div>
        </div>
        
        <!-- Mobile Vertical Timeline Line -->
        <div class="absolute left-[34px] top-0 bottom-0 w-[2px] bg-[#E9D1A7] z-0 md:hidden">
          <div class="w-full bg-[#C59A65] origin-top journey-line-progress h-full scale-y-0"></div>
        </div>

        <div class="space-y-12 md:space-y-24">
          <!-- Step 1 -->
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full journey-step opacity-0 translate-y-10">
            <div class="md:w-1/2 md:pr-16 md:text-right pl-[5rem] md:pl-0 w-full mb-2 md:mb-0">
              <h3 class="font-serif text-[1.75rem] text-[#38251E] mb-2">01. Discover</h3>
              <p class="font-serif text-[#38251E]/80 text-[1rem]">Explore our range of premium products and services designed for every skin type.</p>
            </div>
            <div class="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-[#38251E] border-[4px] border-[#FDF9F2] flex items-center justify-center text-[#C59A65] z-20 shadow-md transition-transform duration-500 hover:scale-110">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="md:w-1/2 md:pl-16 hidden md:block"></div>
          </div>

          <!-- Step 2 -->
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full journey-step opacity-0 translate-y-10">
            <div class="md:w-1/2 md:pr-16 hidden md:block"></div>
            <div class="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-[#D0B286] border-[4px] border-[#FDF9F2] flex items-center justify-center text-[#38251E] z-20 shadow-md transition-transform duration-500 hover:scale-110">
              <i class="fa-regular fa-comments"></i>
            </div>
            <div class="md:w-1/2 md:pl-16 pl-[5rem] md:text-left w-full mt-2 md:mt-0">
              <h3 class="font-serif text-[1.75rem] text-[#38251E] mb-2">02. Consult</h3>
              <p class="font-serif text-[#38251E]/80 text-[1rem]">Speak with our beauty experts to understand your unique needs and goals.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full journey-step opacity-0 translate-y-10">
            <div class="md:w-1/2 md:pr-16 md:text-right pl-[5rem] md:pl-0 w-full mb-2 md:mb-0">
              <h3 class="font-serif text-[1.75rem] text-[#38251E] mb-2">03. Personalize</h3>
              <p class="font-serif text-[#38251E]/80 text-[1rem]">Receive a curated routine or treatment plan specifically matched to you.</p>
            </div>
            <div class="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-[#38251E] border-[4px] border-[#FDF9F2] flex items-center justify-center text-[#C59A65] z-20 shadow-md transition-transform duration-500 hover:scale-110">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div class="md:w-1/2 md:pl-16 hidden md:block"></div>
          </div>

          <!-- Step 4 -->
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full journey-step opacity-0 translate-y-10">
            <div class="md:w-1/2 md:pr-16 hidden md:block"></div>
            <div class="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-[#D0B286] border-[4px] border-[#FDF9F2] flex items-center justify-center text-[#38251E] z-20 shadow-md transition-transform duration-500 hover:scale-110">
              <i class="fa-solid fa-spa"></i>
            </div>
            <div class="md:w-1/2 md:pl-16 pl-[5rem] md:text-left w-full mt-2 md:mt-0">
              <h3 class="font-serif text-[1.75rem] text-[#38251E] mb-2">04. Experience</h3>
              <p class="font-serif text-[#38251E]/80 text-[1rem]">Indulge in our luxurious treatments and premium formulations.</p>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center w-full journey-step opacity-0 translate-y-10">
            <div class="md:w-1/2 md:pr-16 md:text-right pl-[5rem] md:pl-0 w-full mb-2 md:mb-0">
              <h3 class="font-serif text-[1.75rem] text-[#38251E] mb-2">05. Glow</h3>
              <p class="font-serif text-[#38251E]/80 text-[1rem]">Step out with renewed confidence and an unmistakable radiant glow.</p>
            </div>
            <div class="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-[#38251E] border-[4px] border-[#FDF9F2] flex items-center justify-center text-[#C59A65] z-20 shadow-md transition-transform duration-500 hover:scale-110">
              <i class="fa-regular fa-face-smile-beam"></i>
            </div>
            <div class="md:w-1/2 md:pl-16 hidden md:block"></div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- Beauty Transformations Section -->
  <section class="w-full bg-[#38251E] py-24 md:py-32 relative overflow-hidden border-t border-[#FDF9F2]/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16 md:mb-24">
        <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#FDF9F2] leading-tight tracking-tight mb-4">
          Beauty <span class="text-[#D0B286] font-light italic">Transformations</span>
        </h2>
        <p class="font-serif text-[#FDF9F2]/80 text-[1.15rem] max-w-2xl mx-auto">
          See the dramatic yet natural difference our services and products make.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        <!-- Transformation 1 -->
        <div class="transform-card group relative bg-[#FDF9F2]/5 rounded-3xl p-4 md:p-6 border border-[#FDF9F2]/10 transition-all duration-500 hover:border-[#D0B286]/50 hover:-translate-y-2 opacity-0 translate-y-10">
          <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 group">
            <img src="assets/opt_18f4eb42.webp" alt="Skin Consultation Before After" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute bottom-4 left-4 flex gap-2 z-10">
              <span class="bg-[#38251E]/80 backdrop-blur-md text-[#FDF9F2] text-xs font-serif px-3 py-1 rounded-full border border-[#FDF9F2]/20">Before & After</span>
            </div>
          </div>
          <h3 class="font-serif text-2xl text-[#FDF9F2] mb-2">Skin Consultation</h3>
          <p class="font-serif text-[#FDF9F2]/70 text-[1rem]">A tailored routine restoring hydration and natural balance to stressed skin.</p>
        </div>

        <!-- Transformation 2 -->
        <div class="transform-card group relative bg-[#FDF9F2]/5 rounded-3xl p-4 md:p-6 border border-[#FDF9F2]/10 transition-all duration-500 hover:border-[#D0B286]/50 hover:-translate-y-2 opacity-0 translate-y-10 delay-100">
          <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 group">
            <img src="assets/opt_b882686d.webp" alt="Makeup Look Before After" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute bottom-4 left-4 flex gap-2 z-10">
              <span class="bg-[#38251E]/80 backdrop-blur-md text-[#FDF9F2] text-xs font-serif px-3 py-1 rounded-full border border-[#FDF9F2]/20">Before & After</span>
            </div>
          </div>
          <h3 class="font-serif text-2xl text-[#FDF9F2] mb-2">Signature Makeup Look</h3>
          <p class="font-serif text-[#FDF9F2]/70 text-[1rem]">Elevating natural features with our breathable, luminous formulations.</p>
        </div>

        <!-- Transformation 3 -->
        <div class="transform-card group relative bg-[#FDF9F2]/5 rounded-3xl p-4 md:p-6 border border-[#FDF9F2]/10 transition-all duration-500 hover:border-[#D0B286]/50 hover:-translate-y-2 opacity-0 translate-y-10">
          <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 group">
            <img src="assets/bridal_composite.webp" alt="Bridal Look Before After" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute bottom-4 left-4 flex gap-2 z-10">
              <span class="bg-[#38251E]/80 backdrop-blur-md text-[#FDF9F2] text-xs font-serif px-3 py-1 rounded-full border border-[#FDF9F2]/20">Before & After</span>
            </div>
          </div>
          <h3 class="font-serif text-2xl text-[#FDF9F2] mb-2">Bridal Radiance</h3>
          <p class="font-serif text-[#FDF9F2]/70 text-[1rem]">Long-wear, flawless finish designed to look stunning in person and on camera.</p>
        </div>

        <!-- Transformation 4 -->
        <div class="transform-card group relative bg-[#FDF9F2]/5 rounded-3xl p-4 md:p-6 border border-[#FDF9F2]/10 transition-all duration-500 hover:border-[#D0B286]/50 hover:-translate-y-2 opacity-0 translate-y-10 delay-100">
          <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 group">
            <img src="assets/opt_f1f1fde0.webp" alt="Shade Matching Before After" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute bottom-4 left-4 flex gap-2 z-10">
              <span class="bg-[#38251E]/80 backdrop-blur-md text-[#FDF9F2] text-xs font-serif px-3 py-1 rounded-full border border-[#FDF9F2]/20">Before & After</span>
            </div>
          </div>
          <h3 class="font-serif text-2xl text-[#FDF9F2] mb-2">Perfect Shade Matching</h3>
          <p class="font-serif text-[#FDF9F2]/70 text-[1rem]">Seamless blending that matches your exact undertone and complexion.</p>
        </div>

      </div>
    </div>
  </section>
"""

# BLOG PAGE HTML
blog_html = """
  <!-- Beauty Guides Section -->
  <section class="w-full bg-[#38251E] py-24 md:py-32 relative overflow-hidden border-t border-[#FDF9F2]/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#FDF9F2] leading-tight tracking-tight mb-4">
            Beauty <span class="text-[#D0B286] font-light italic">Guides</span>
          </h2>
          <p class="font-serif text-[#FDF9F2]/80 text-[1.15rem] max-w-lg">
            Editorial deep-dives into routines, ingredients, and techniques.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        <!-- Guide 1 (Large) -->
        <a href="#" class="group md:col-span-7 relative h-[350px] md:h-[600px] rounded-3xl overflow-hidden block guide-card opacity-0 translate-y-10 shadow-lg">
          <img src="assets/opt_2c92114b.webp" alt="Skincare Routine Guide" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#38251E]/90 via-[#38251E]/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <span class="inline-block px-3 py-1 bg-[#D0B286] text-[#38251E] text-xs font-serif rounded-full mb-4">Skincare</span>
            <h3 class="font-serif text-2xl md:text-4xl text-[#FDF9F2] mb-3 leading-tight">The Ultimate Skincare Routine Guide</h3>
            <span class="text-[#FDF9F2]/70 text-sm font-sans tracking-wide">8 MIN READ</span>
          </div>
        </a>

        <!-- Guide 2 (Tall) -->
        <a href="#" class="group md:col-span-5 relative h-[350px] md:h-[600px] rounded-3xl overflow-hidden block guide-card opacity-0 translate-y-10 delay-100 shadow-lg">
          <img src="assets/opt_b1a3fb35.webp" alt="Find Your Perfect Shade" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#38251E]/90 via-[#38251E]/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <span class="inline-block px-3 py-1 bg-[#FDF9F2] text-[#38251E] text-xs font-serif rounded-full mb-4">Makeup</span>
            <h3 class="font-serif text-2xl md:text-4xl text-[#FDF9F2] mb-3 leading-tight">Find Your Perfect Foundation Shade</h3>
            <span class="text-[#FDF9F2]/70 text-sm font-sans tracking-wide">5 MIN READ</span>
          </div>
        </a>

        <!-- Guide 3 (Wide) -->
        <a href="#" class="group md:col-span-5 relative h-[350px] md:h-[400px] rounded-3xl overflow-hidden block guide-card opacity-0 translate-y-10 shadow-lg">
          <img src="assets/opt_338764b8.webp" alt="Ingredient Guide" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#38251E]/90 via-[#38251E]/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <span class="inline-block px-3 py-1 bg-[#E9D1A7] text-[#38251E] text-xs font-serif rounded-full mb-4">Education</span>
            <h3 class="font-serif text-xl md:text-3xl text-[#FDF9F2] mb-3 leading-tight">The Master Ingredient Guide</h3>
            <span class="text-[#FDF9F2]/70 text-sm font-sans tracking-wide">12 MIN READ</span>
          </div>
        </a>

        <!-- Guide 4 (Wide) -->
        <a href="#" class="group md:col-span-7 relative h-[350px] md:h-[400px] rounded-3xl overflow-hidden block guide-card opacity-0 translate-y-10 delay-100 shadow-lg">
          <img src="assets/sets_category.webp" alt="Beginner's Makeup Guide" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#38251E]/90 via-[#38251E]/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <span class="inline-block px-3 py-1 bg-[#D0B286] text-[#38251E] text-xs font-serif rounded-full mb-4">Tutorials</span>
            <h3 class="font-serif text-xl md:text-3xl text-[#FDF9F2] mb-3 leading-tight">Beginner’s Makeup Guide for a Flawless Finish</h3>
            <span class="text-[#FDF9F2]/70 text-sm font-sans tracking-wide">6 MIN READ</span>
          </div>
        </a>

      </div>
    </div>
  </section>

  <!-- Ask Our Beauty Experts Section -->
  <section class="w-full bg-[#FDF9F2] py-24 md:py-32 relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="w-16 h-16 mx-auto bg-[#38251E] rounded-full flex items-center justify-center text-[#D0B286] mb-6 shadow-md">
          <i class="fa-solid fa-leaf text-2xl"></i>
        </div>
        <h2 class="font-serif text-[2.5rem] md:text-[3.25rem] text-[#38251E] leading-tight tracking-tight mb-4">
          Ask Our <span class="text-[#D0B286] font-light italic">Beauty Experts</span>
        </h2>
      </div>

      <div class="space-y-4 accordion-container">
        
        <!-- FAQ 1 -->
        <div class="faq-item border border-[#38251E]/10 rounded-2xl overflow-hidden bg-white transition-colors duration-300">
          <button class="faq-btn w-full px-6 py-5 md:p-8 flex justify-between items-center text-left focus:outline-none bg-transparent">
            <h3 class="font-serif text-[1.1rem] md:text-2xl text-[#38251E] pr-8">Which serum is right for my skin?</h3>
            <span class="faq-icon flex-shrink-0 w-10 h-10 rounded-full border border-[#38251E]/20 flex items-center justify-center text-[#38251E] transition-transform duration-300">
              <i class="fa-solid fa-plus"></i>
            </span>
          </button>
          <div class="faq-content overflow-hidden transition-[max-height] duration-500 ease-in-out" style="max-height: 0;">
            <div class="px-6 pb-6 md:px-8 md:pb-8">
              <p class="font-serif text-[#38251E]/80 text-[1rem] md:text-[1.05rem] leading-relaxed">
                It depends entirely on your primary skin goals. For hydration, look for Hyaluronic Acid. To brighten and even tone, Vitamin C is essential. If you are targeting fine lines, a gentle Retinol or Bakuchiol serum will be most effective.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="faq-item border border-[#38251E]/10 rounded-2xl overflow-hidden bg-white transition-colors duration-300">
          <button class="faq-btn w-full px-6 py-5 md:p-8 flex justify-between items-center text-left focus:outline-none bg-transparent">
            <h3 class="font-serif text-[1.1rem] md:text-2xl text-[#38251E] pr-8">How do I find my undertone?</h3>
            <span class="faq-icon flex-shrink-0 w-10 h-10 rounded-full border border-[#38251E]/20 flex items-center justify-center text-[#38251E] transition-transform duration-300">
              <i class="fa-solid fa-plus"></i>
            </span>
          </button>
          <div class="faq-content overflow-hidden transition-[max-height] duration-500 ease-in-out" style="max-height: 0;">
            <div class="px-6 pb-6 md:px-8 md:pb-8">
              <p class="font-serif text-[#38251E]/80 text-[1rem] md:text-[1.05rem] leading-relaxed">
                Look at the veins on your wrist in natural light. Blue or purple indicates a cool undertone; green indicates warm. If you see a mix of both, you likely have a neutral undertone. Silver jewelry flatters cool tones, while gold flatters warm.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="faq-item border border-[#38251E]/10 rounded-2xl overflow-hidden bg-white transition-colors duration-300">
          <button class="faq-btn w-full px-6 py-5 md:p-8 flex justify-between items-center text-left focus:outline-none bg-transparent">
            <h3 class="font-serif text-[1.1rem] md:text-2xl text-[#38251E] pr-8">What should I use for a simple morning routine?</h3>
            <span class="faq-icon flex-shrink-0 w-10 h-10 rounded-full border border-[#38251E]/20 flex items-center justify-center text-[#38251E] transition-transform duration-300">
              <i class="fa-solid fa-plus"></i>
            </span>
          </button>
          <div class="faq-content overflow-hidden transition-[max-height] duration-500 ease-in-out" style="max-height: 0;">
            <div class="px-6 pb-6 md:px-8 md:pb-8">
              <p class="font-serif text-[#38251E]/80 text-[1rem] md:text-[1.05rem] leading-relaxed">
                A simple, effective morning routine consists of three core steps: gently cleanse, apply a targeted serum or moisturizer to hydrate, and finish with a broad-spectrum SPF to protect your skin throughout the day.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 4 -->
        <div class="faq-item border border-[#38251E]/10 rounded-2xl overflow-hidden bg-white transition-colors duration-300">
          <button class="faq-btn w-full px-6 py-5 md:p-8 flex justify-between items-center text-left focus:outline-none bg-transparent">
            <h3 class="font-serif text-[1.1rem] md:text-2xl text-[#38251E] pr-8">How can I choose the right foundation shade?</h3>
            <span class="faq-icon flex-shrink-0 w-10 h-10 rounded-full border border-[#38251E]/20 flex items-center justify-center text-[#38251E] transition-transform duration-300">
              <i class="fa-solid fa-plus"></i>
            </span>
          </button>
          <div class="faq-content overflow-hidden transition-[max-height] duration-500 ease-in-out" style="max-height: 0;">
            <div class="px-6 pb-6 md:px-8 md:pb-8">
              <p class="font-serif text-[#38251E]/80 text-[1rem] md:text-[1.05rem] leading-relaxed">
                Always test foundation on your jawline, not your hand, and check the match in natural daylight. The right shade will disappear into your skin without leaving a harsh line of demarcation between your face and neck.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
"""

# Apply modifications
insert_before('about.html', '  <!-- Footer -->', about_html)
insert_before('services.html', '  <!-- CTA Section -->', services_html)
insert_before('blog.html', '  <!-- Our Promise Section -->', blog_html)
