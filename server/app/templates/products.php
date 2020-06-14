<?php

    include_once('./app/util.php');
    
    $html = ("
        <section id='list-products'>
            <h2 id='products-title'>$productsTitle</h2>
            <div class='container-products'>
        ");
        
        if($displayProducts) {
            foreach($products as $product) {
                $html .= ("
                    <article ". ($product->discountPrice ? 'class="disccount"' : '') .">
                        <a class='promoted-link' href='$product->url' target='_blank'>
                        <div class='image-container'>
                            <div class='percentage'>-". getDiscountPercentage($product->originalPrice, $product->discountPrice) ."%</div>
                            <div class='image lazyload' style='background-image: url(\"$product->image\")'></div>
                        </div>
                        <div class='info'> 
                            <div class='price'>
                                <div class='offer'>". ($product->discountPrice ? $product->discountPrice : '') ."</div>
                                <div class='original'>$$product->originalPrice</div>
                            </div>
                            <div class='name'>". ucfirst($product->name) ."</div>
                        </div>
                        </a>
                    </article>
                ");
        }
    }

    $html .= ("
            </div>
            <div class='loader-container'>
                <div class='loader'></div>
            </div>
        </section>
        ");