import Image from 'next/image'
import { ingredientImage } from '@/lib/ingredient-images'

/**
 * One line of an ingredient list, with a thumbnail where we have a confident
 * match. Ingredients without one simply align to the same text column, so the
 * list stays tidy rather than showing a stand-in photo of something else.
 */
export function IngredientItem({ text }: { text: string }) {
  const src = ingredientImage(text)

  return (
    <li className="ingredient-row">
      <span className="ingredient-thumb" aria-hidden="true">
        {src && (
          <Image src={src} alt="" width={160} height={160} sizes="34px" />
        )}
      </span>
      <span className="recipe-ingredient-list text-sm leading-relaxed">{text}</span>
    </li>
  )
}
