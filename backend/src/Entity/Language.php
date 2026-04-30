<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LanguageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LanguageRepository::class)]
#[ApiResource]
class Language
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, CvLanguage>
     */
    #[ORM\OneToMany(targetEntity: CvLanguage::class, mappedBy: 'language')]
    private Collection $cvLanguages;

    public function __construct()
    {
        $this->cvLanguages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, CvLanguage>
     */
    public function getCvLanguages(): Collection
    {
        return $this->cvLanguages;
    }

    public function addCvLanguage(CvLanguage $cvLanguage): static
    {
        if (!$this->cvLanguages->contains($cvLanguage)) {
            $this->cvLanguages->add($cvLanguage);
            $cvLanguage->setLanguage($this);
        }

        return $this;
    }

    public function removeCvLanguage(CvLanguage $cvLanguage): static
    {
        if ($this->cvLanguages->removeElement($cvLanguage)) {
            // set the owning side to null (unless already changed)
            if ($cvLanguage->getLanguage() === $this) {
                $cvLanguage->setLanguage(null);
            }
        }

        return $this;
    }
}
